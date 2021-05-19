import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer} from '_components';
import {
  Button,
  EditTimeButton,
  StartEndTimeButtons,
  TimeSelector,
  DateSelector,
} from '_components';
import {DateUtils} from '_utils';
import {Icons, Utils} from '_constants';
import {Colors} from '_resources';
import {States} from '_constants';
import {HoursUtils, InputUtils} from '_utils';
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
    this.confirmDateChange = this.confirmDateChange.bind(this);
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
    this.setState({
      tempDate: new Date(dateObject.year, dateObject.month - 1, dateObject.day),
    });
  }

  openDateModal() {
    this.setState({dateModalVisible: true, tempDate: this.state.date});
  }

  confirmDateChange() {
    this.setState({
      date: this.state.tempDate,
      startTime: new Date(
        this.state.tempDate.getFullYear(),
        this.state.tempDate.getMonth() + 1,
        this.state.tempDate.getDate(),
        this.state.startTime.getHours(),
        this.state.startTime.getMinutes(),
        0,
      ),
      endTime: new Date(
        this.state.tempDate.getFullYear(),
        this.state.tempDate.getMonth() + 1,
        this.state.tempDate.getDate(),
        this.state.endTime.getHours(),
        this.state.endTime.getMinutes(),
        0,
      ),
    });
    this.closeModal();
  }

  confirmTimeChange() {
    if (this.state.startTimeModalVisible) {
      const startTime = this.state.startTime;
      startTime.setHours(this.state.setTimeHours);
      startTime.setMinutes(this.state.setTimeMinutes);

      this.setState({startTime});
    } else if (this.state.endTimeModalVisible) {
      const endTime = this.state.endTime;
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
      <View style={styles.container}>
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
          <View style={styles.innerContainer}>
            <EditTimeButton
              editDescription="Select Date"
              time={DateUtils.convertDateToString({
                date: this.state.date,
                format: Utils.dateFormat.monthDateYear,
              })}
              icon={Icons.calendar}
              editPressed={this.openDateModal}
            />
            <View style={styles.spacing} />
            <StartEndTimeButtons
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              startPressed={this.openStartTimeModal}
              endPressed={this.openEndTimeModal}
            />
            <Text style={styles.hoursWorked}>
              {timeWorked.hours} hrs {timeWorked.minutes} mins
            </Text>
          </View>
        </ActionContainer>
        <View style={styles.button}>
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
          date={DateUtils.convertDateToString({
            date: this.state.tempDate,
            format: Utils.dateFormat.yyyy_mm_dd,
          })}
          changeDate={this.changeDate}
          visible={this.state.dateModalVisible}
          closeModal={this.closeModal}
          confirmDateChange={this.confirmDateChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 16,
  },
  spacing: {
    padding: 8,
  },
  button: {
    position: 'absolute',
    left: 16,
    bottom: 32,
  },
  hoursWorked: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default AddProjectHours;
