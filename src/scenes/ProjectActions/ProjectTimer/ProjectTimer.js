import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ActionContainer,
  StartStopButton,
  ProjectClock,
  Task,
  WeeklyGoal,
  HoursWorked,
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

  renderHoursWorked(hoursWorkedData) {
    return (
      <HoursWorked
        date={hoursWorkedData.date}
        hoursWorkedList={hoursWorkedData.hoursWorkedList}
      />
    );
  }

  renderTask(task) {
    return <Task description={task.description} complete={task.complete} />;
  }

  renderGoal(goalData) {
    return (
      <WeeklyGoal
        thisWeeksSecondsWorked={goalData.thisWeeksSecondsWorked}
        thisWeeksSecondsGoal={goalData.thisWeeksSecondsGoal}
        updateWeeklyGoal
      />
    );
  }

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
    ];

    const hoursWorkedData = [
      {
        date: new Date('April 22, 2021 05:24'),
        hoursWorkedList: [
          {
            startTime: new Date('April 22, 2021 05:24'),
            endTime: new Date('April 22, 2021 08:57'),
          },
          {
            startTime: new Date('April 23, 2021 09:24'),
            endTime: new Date('April 23, 2021 13:57'),
          },
        ],
      },
      {
        date: new Date(),
        hoursWorkedList: [
          {
            startTime: new Date('April 24, 2021 05:24'),
            endTime: new Date('April 24, 2021 08:57'),
          },
          {
            startTime: new Date('April 25, 2021 09:24'),
            endTime: new Date('April 25, 2021 12:57'),
          },
        ],
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
    // Task State
    /*return (
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
          actionButtonDescription="Your Task"
          listData={taskList}
          listDataActive={true}
          renderListItem={this.renderTask}
        />
      </View>
    );*/

    // Goal State
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
          listData={goalData}
          listDataActive={true}
          renderListItem={this.renderGoal}
        />
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
          actionButtonDescription="Hours Worked"
          listData={hoursWorkedData}
          listDataActive={true}
          renderListItem={this.renderHoursWorked}
        />
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
