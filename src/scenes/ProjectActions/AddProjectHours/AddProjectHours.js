import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ActionContainer} from '_components';
import {Button, EditTimeButton, StartEndTimeButtons} from '_components';
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
    };
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
              editPressed
            />
            <View style={styles.spacing} />
            <StartEndTimeButtons
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              startPressed
              endPressed
            />
            <Text style={styles.hoursWorked}>3 hrs 45 mins</Text>
          </View>
        </ActionContainer>
        <View style={styles.button}>
          <Button description="+ Add Hours" buttonPressed={false} />
        </View>
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
