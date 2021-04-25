import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActionContainer, StartStopButton, ProjectClock} from '_components';
import {Icons} from '_constants';

class ProjectTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addPressed = this.addPressed.bind(this);
  }

  addPressed() {}

  renderHoursWorked(hoursWorked) {}

  renderTask(task) {}

  renderGoal(gal) {}

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: true,
      centerIconName: Icons.clock,
      actionDescription: 'Time Is Life',
      subDescription: 'Project Timer',
    };

    const actionNavBarData = {
      taskNavButtonSelected: false,
      taskNavButtonPressed: false,
      timerNavButtonSelected: true,
      timerNavButtonPressed: false,
      goalsNavButtonSelected: false,
      goalsNavButtonPressed: false,
    };

    return (
      <View style={styles.container}>
        <ActionContainer
          deactivateBottomContainer
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={true}
          actionNavBarData={actionNavBarData}
          actionButtonActive={false}
          actionButtonPressed={this.addPressed}
          listData={false}
          listDataActive={false}
          renderListItem={false}>
          <ProjectClock />
        </ActionContainer>
        <StartStopButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectTimer;
