import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActionContainer} from '_components';
import {WeeklyGoal} from '_components';
import {Icons} from '_constants';

class ManageWeeklyGoals extends Component {
  renderGoal(goalData) {
    return (
      <WeeklyGoal
        thisWeeksSecondsWorked={goalData.thisWeeksSecondsWorked}
        thisWeeksSecondsGoal={goalData.thisWeeksSecondsGoal}
        updateWeeklyGoal
      />
    );
  }

  render() {
    const actionScreenData = {
      backArrowActive: false,
      editButtonActive: false,
      topRightButtonActive: false,
      centerIconName: Icons.goals,
      actionDescription: 'Total Weekly Goals',
    };

    const goalData = [
      {
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
    ];

    return (
      <View style={styles.container}>
        <ActionContainer
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={false}
          topChildActive={false}
          topChild={false}
          bottomChildActive={false}
          bottomChild={false}
          actionButtonActive={false}
          actionButtonPressed={false}
          listData={goalData}
          listDataActive={true}
          renderListItem={this.renderGoal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManageWeeklyGoals;
