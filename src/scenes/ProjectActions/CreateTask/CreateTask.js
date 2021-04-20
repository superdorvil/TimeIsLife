import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActionContainer} from '_components';

class CreateTask extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActionContainer
          weeklyProgressActive
          progress
          secondsWorked
          secondsGoal
          weekdaySeconds
          topChild
          actionButton
          listData
          renderListItem
          bottomChild
          navBarActive
          taskActive
          timerActive
          goalsActive
          taskNavButton
          timerNavButton
          goalsNavButton
          backArrowPressed
          centerIconName
          actionDescription
          subDescription
          subDescription2
          editButtonActive
          topRightButtonActive
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

export default CreateTask;
