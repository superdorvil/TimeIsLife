import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer} from '_components';
import {
  Button,
  EditTimeButton,
  StartEndTimeButtons,
  TimeSelector,
  DateSelector,
} from '_components';
import {Icons, Utils} from '_constants';
import {Colors} from '_resources';
import {States} from '_constants';
import {DateUtils, HoursUtils, InputUtils} from '_utils';
import projectDB from '_data';

class AddProjectHours extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    currentDate.setSeconds(0);

    this.state = {
      date: new Date(currentDate),
      tempDate: new Date(currentDate),
      startTime: new Date(currentDate),
      endTime: new Date(currentDate),
      setTimeHours: 0,
      setTimeMinutes: 0,
      dateModalVisible: false,
      startTimeModalVisible: false,
      endTimeModalVisible: false,
      ampm: States.am,
    };

    this.changeDate = this.changeDate.bind(this);
    this.openDateModal = this.openDateModal.bind(this);
    this.confirmTimeChange = this.confirmTimeChange.bind(this);
    this.openStartTimeModal = this.openStartTimeModal.bind(this);
    this.openEndTimeModal = this.openEndTimeModal.bind(this);
    this.ampmPressed = this.ampmPressed.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateSetTimeHours = this.updateSetTimeHours.bind(this);
    this.updateSetTimeMinutes = this.updateSetTimeMinutes.bind(this);
    this.addSecondsWorked = this.addSecondsWorked.bind(this);
  }

  changeDate(dateObject) {
    //console.log(dateObject);
    // this.setState({date: new Date(dateObject.timestamp + 86400000)});
    const startHours = this.state.startTime.getHours();
    const startMinutes = this.state.startTime.getMinutes();
    const endHours = this.state.endTime.getHours();
    const endMinutes = this.state.endTime.getMinutes();

    const date = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );
    const startTime = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );
    const endTime = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );

    startTime.setHours(startHours);
    startTime.setMinutes(startMinutes);
    endTime.setHours(endHours);
    endTime.setMinutes(endMinutes);

    this.setState({
      date,
      startTime,
      endTime,
    });

    this.closeModal();
  }

  openDateModal() {
    this.setState({dateModalVisible: true, tempDate: this.state.date});
  }

  confirmTimeChange() {
    if (this.state.startTimeModalVisible) {
      const startTime = new Date(this.state.date);
      startTime.setHours(this.state.setTimeHours);
      startTime.setMinutes(this.state.setTimeMinutes);

      this.setState({startTime});
    } else if (this.state.endTimeModalVisible) {
      const endTime = new Date(this.state.date);
      endTime.setHours(this.state.setTimeHours);
      endTime.setMinutes(this.state.setTimeMinutes);

      this.setState({endTime});
    }

    this.closeModal();
  }

  openStartTimeModal() {
    this.setState({startTimeModalVisible: true});
  }

  openEndTimeModal() {
    this.setState({endTimeModalVisible: true});
  }

  closeModal() {
    this.setState({
      dateModalVisible: false,
      startTimeModalVisible: false,
      endTimeModalVisible: false,
    });
  }

  updateSetTimeHours(value) {
    this.setState({
      setTimeHours: InputUtils.numberRangeInput({min: 0, max: 23, value}),
    });
  }

  updateSetTimeMinutes(value) {
    this.setState({
      setTimeMinutes: InputUtils.numberRangeInput({min: 0, max: 59, value}),
    });
  }

  ampmPressed(ampm) {
    this.setState({ampm});
  }

  addSecondsWorked() {
    if (this.state.endTime > this.state.startTime) {
      projectDB.createSecondsWorked({
        realm: this.props.realm,
        projectID: this.props.project.id,
        dateIndex: DateUtils.getDateIndex({date: this.state.startTime}),
        weekIndex: DateUtils.getWeekIndex({date: this.state.startTime}),
        monthIndex: DateUtils.getMonthIndex({date: this.state.startTime}),
        yearIndex: DateUtils.getYearIndex({date: this.state.startTime}),
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      });

      Actions.pop();
    } else {
      console.log('fix me, add proper error checking for this');
    }
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: false,
      topRightButtonActive: false,
      centerIconName: Icons.checkmark,
      actionDescription: 'Add Hours',
    };

    const timeWorked = HoursUtils.convertSecondsToHrsMinsSecs({
      totalSeconds: (this.state.endTime - this.state.startTime) / 1000,
      doubleDigitMinutes: true,
    });

    return (
      <View style={containerStyle()}>
        <ActionContainer
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={false}
          actionButtonActive={false}
          actionButtonPressed={false}
          listDataActive={false}
          listData={false}
          renderListItem={false}>
          <View style={innerContainerStyle()}>
            <EditTimeButton
              editDescription="Select Date"
              time={DateUtils.convertDateToString({
                date: this.state.date,
                format: Utils.dateFormat.monthDateYear,
              })}
              icon={Icons.calendar}
              editPressed={this.openDateModal}
            />
            <View style={spacingStyle()} />
            <StartEndTimeButtons
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              startPressed={this.openStartTimeModal}
              endPressed={this.openEndTimeModal}
            />
            <Text style={hoursWorkedStyle()}>
              {timeWorked.hours} hrs {timeWorked.minutes} mins
            </Text>
          </View>
        </ActionContainer>
        <View style={buttonStyle()}>
          <Button
            description="+ Add Hours"
            buttonPressed={this.addSecondsWorked}
          />
        </View>
        <TimeSelector
          visible={
            this.state.startTimeModalVisible || this.state.endTimeModalVisible
          }
          setTimeDescription={
            this.state.startTimeModalVisible ? 'Set Start Time' : 'Set End Time'
          }
          hours={this.state.setTimeHours}
          minutes={this.state.setTimeMinutes}
          updateHours={this.updateSetTimeHours}
          updateMinutes={this.updateSetTimeMinutes}
          amPressed={() => this.ampmPressed(States.am)}
          pmPressed={() => this.ampmPressed(States.pm)}
          ampm={this.state.ampm}
          okayPressed={this.confirmTimeChange}
          cancelPressed={this.closeModal}
        />
        <DateSelector
          dateString={DateUtils.convertDateToString({
            date: this.state.tempDate,
            format: Utils.dateFormat.yyyy_mm_dd,
          })}
          date={this.state.tempDate}
          changeDate={this.changeDate}
          visible={this.state.dateModalVisible}
          closeModal={this.closeModal}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

const innerContainerStyle = () => {
  return {
    flex: 1,
    marginTop: 16,
  };
};

const spacingStyle = () => {
  return {padding: 8};
};

const buttonStyle = () => {
  return {
    position: 'absolute',
    left: 16,
    bottom: 32,
  };
};

const hoursWorkedStyle = () => {
  return {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    color: Colors.primary[global.colorScheme],
  };
};

export default AddProjectHours;
