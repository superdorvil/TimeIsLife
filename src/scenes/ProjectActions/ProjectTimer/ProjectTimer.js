import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ActionContainer,
  StartStopButton,
  ProjectClock,
  Task,
} from '_components';
import {Icons, States} from '_constants';

class ProjectTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: States.timer,
    };

    this.addPressed = this.addPressed.bind(this);
    this.taskState = this.taskState.bind(this);
    this.timerState = this.timerState.bind(this);
    this.goalsState = this.goalsState.bind(this);
  }

  addPressed() {
    if (this.state.mode === States.task) {
      console.log('add task');
    } else if (this.state.mode === States.goals) {
      console.log('add goals');
    }
  }

  renderHoursWorked(hoursWorked) {}

  renderTask(task) {
    return <Task description={task.description} complete={task.complete} />;
  }

  renderGoal(goal) {}

  taskState() {
    console.log('hello');
    this.setState({mode: States.task});
  }

  timerState() {
    this.setState({mode: States.timer});
  }

  goalsState() {
    this.setState({mode: States.goals});
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: true,
      centerIconName: Icons.clock,
      actionDescription: 'Time Is Life',
      subDescription: 'Project Timer',
    };

    const actionNavBarData = {
      taskNavButtonSelected: this.state.mode === States.task,
      taskNavButtonPressed: this.taskState,
      timerNavButtonSelected: this.state.mode === States.timer,
      timerNavButtonPressed: this.timerState,
      goalsNavButtonSelected: this.state.mode === States.goals,
      goalsNavButtonPressed: this.goalsState,
    };

    const taskList = [
      {
        description: 'This is task 1',
        complete: true,
      },
      {
        description: 'This is task 2',
        complete: true,
      },
      {
        description: 'This is task 3',
        complete: false,
      },
      {
        description: 'This is task 4',
        complete: true,
      },
    ];

    // Timer active state
    /*return (
      <View style={styles.container}>
        <ActionContainer
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
    );*/
    return (
      <View style={styles.container}>
        <ActionContainer
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={true}
          actionNavBarData={actionNavBarData}
          actionButtonActive={true}
          actionButtonPressed={this.addPressed}
          listData={taskList}
          listDataActive={true}
          renderListItem={this.renderTask}
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

export default ProjectTimer;
