import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActionContainer} from '_components';

class ProjectList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActionContainer
          weeklyProgressActive
          progress={0.1}
          secondsWorked={30000}
          secondsGoal={54000}
          weekdaySeconds={[
            {weekday: new Date('Apr 11 2021'), secondsWorked: 3},
            {weekday: new Date('Apr 12 2021'), secondsWorked: 3},
            {weekday: new Date('Apr 13 2021'), secondsWorked: 3},
            {weekday: new Date('Apr 14 2021'), secondsWorked: 3},
            {weekday: new Date('Apr 15 2021'), secondsWorked: 3},
            {weekday: new Date('Apr 16 2021'), secondsWorked: 3},
            {weekday: new Date(), secondsWorked: 3},
          ]}
          topChild
          actionButton
          listData={[]}
          renderListItem
          bottomChild
          navBarActive={false}
          taskActive
          taskNavButton
          timerActive
          timerNavButton
          goalsActive
          goalsNavButton
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ProjectList;
