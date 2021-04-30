import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

class AddProjectHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      dateModalVisible: false,
      startTimeModalVisible: false,
      endTimeModalVisible: false,
      ampm: 'am',
    };

    this.calendarPressed = this.calendarPressed.bind(this);
    this.datePressed = this.datePressed.bind(this);
    this.startTimePressed = this.startTimePressed.bind(this);
    this.endTimePressed = this.endTimePressed.bind(this);
    this.cancelPressed = this.cancelPressed.bind(this);
  }

  calendarPressed(dateObject) {
    console.log(dateObject);
    // this.setState({date: new Date(dateObject.timestamp + 86400000)});
    this.setState({
      date: new Date(dateObject.year, dateObject.month - 1, dateObject.day),
    });
  }

  datePressed() {
    this.setState({dateModalVisible: true});
  }

  startTimePressed() {
    this.setState({startTimeModalVisible: true});
  }

  endTimePressed() {
    this.setState({endTimeModalVisible: true});
  }

  cancelPressed() {
    this.setState({
      dateModalVisible: false,
      startTimeModalVisible: false,
      endTimeModalVisible: false,
    });
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: false,
      topRightButtonActive: false,
      centerIconName: Icons.checkmark,
      actionDescription: 'Add Hours',
    };

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
              editPressed={this.datePressed}
            />
            <View style={styles.spacing} />
            <StartEndTimeButtons
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              startPressed={this.startTimePressed}
              endPressed={this.endTimePressed}
            />
            <Text style={styles.hoursWorked}>3 hrs 45 mins</Text>
          </View>
        </ActionContainer>
        <View style={styles.button}>
          <Button description="+ Add Hours" buttonPressed={false} />
        </View>
        <TimeSelector
          visible={
            this.state.startTimeModalVisible || this.state.endTimeModalVisible
          }
          setTimeDescription={
            this.state.startTimeModalVisible ? 'Set Start Time' : 'Set End Time'
          }
          hours={8}
          minutes={45}
          updateHours={false}
          updateMinutes={false}
          amPressed
          pmPressed
          ampm={this.state.ampm}
          okayPressed
          cancelPressed={this.cancelPressed}
        />
        <DateSelector
          date={DateUtils.convertDateToString({
            date: this.state.date,
            format: Utils.dateFormat.yyyy_mm_dd,
          })}
          calendarPressed={this.calendarPressed}
          visible={this.state.dateModalVisible}
          cancelPressed={this.cancelPressed}
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
