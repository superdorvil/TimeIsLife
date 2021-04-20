import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActionContainer} from '_components';

class ProjectList extends Component {
  render() {
    const weeklyProgressData = {
      progress: 0.1, // decimal value 0.0 - 1
      secondsGoal: 3600,
      secondsWorked: 2300,
      weekdaySeconds: [
        {weekday: new Date('Apr 11 2021'), secondsWorked: 3},
        {weekday: new Date('Apr 12 2021'), secondsWorked: 3},
        {weekday: new Date('Apr 13 2021'), secondsWorked: 3},
        {weekday: new Date('Apr 14 2021'), secondsWorked: 3},
        {weekday: new Date('Apr 15 2021'), secondsWorked: 3},
        {weekday: new Date('Apr 16 2021'), secondsWorked: 3},
        {weekday: new Date(), secondsWorked: 3},
      ],
    };

    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: true,
      topRightButtonActive: true,
      centerIconName: 'Time Is Life',
      actionDescription: '',
      subDescription: '',
      subDescription2: '',
    };

    const actionNavBarData = {
      taskNavButtonActive: false,
      taskNavButtonPressed: false,
      timerNavButtonActive: false,
      timerNavButtonPressed: false,
      goalsNavButtonActive: false,
      goalsNavButtonPressed: false,
    };

    return (
      <View style={styles.container}>
        <ActionContainer
          weeklyProgressActive
          weeklyProgressData={weeklyProgressData}
          actionScreenActive={false}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={actionNavBarData}
          topChildActive={false}
          topChild={false}
          bottomChildActive={false}
          bottomChild={false}
          actionButtonActive={true}
          actionButtonPressed={false}
          listData={[]}
          listDataActive={false}
          renderListItem={() => {}}
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

export default ProjectList;
