import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ActionContainer,
  StartStopButton,
  HoursWorked,
  WeeklyGoal,
  Task,
  ViewVisibleWrapper,
} from '_components';
import projectDB from '_data';
import {Icons, States} from '_constants';

/*const goalData = [
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
];*/

class ProjectManager extends Component {
  constructor(props) {
    super(props);

    const tasks = projectDB.getTasks({realm: this.props.realm});
    const secondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      projectID: this.props.project.id,
      minimumWeekIndex: this.props.currentWeekIndex - 8,
      maximumWeekIndex: this.props.currentWeekIndex,
    });
    const weeklyGoals = projectDB.getWeeklyGoals({
      realm: this.props.realm,
      projectID: this.props.project.id,
      minimumWeekIndex: this.props.currentWeekIndex - 8,
      maximumWeekIndex: this.props.currentWeekIndex,
    });
    const weeklySecondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      projectID: this.props.project.id,
      weeklyIndex: this.props.currentWeekIndex,
      minimumWeekIndex: this.props.currentWeekIndex - 8,
      maximumWeekIndex: this.props.currentWeekIndex,
    });

    this.state = {
      mode: States.timer,
      centerIconName: Icons.clock,
      tasks,
      secondsWorked,
      weeklyGoals,
      weeklySecondsWorked,
      listData: tasks,
      goalsMaxWeekIndex: this.props.currentWeekIndex,
      goalsMinWeekIndex: this.props.currentWeekIndex,
      secondsWorkedMaxWeekIndex: this.props.currentWeekIndex,
      secondsWorkedMinWeekIndex: this.props.currentWeekIndex,
    };

    this.editProject = this.editProject.bind(this);
    this.taskState = this.taskState.bind(this);
    this.timerState = this.timerState.bind(this);
    this.goalsState = this.goalsState.bind(this);
    this.timerPressed = this.timerPressed.bind(this);
    this.addPressed = this.addPressed.bind(this);
  }

  addPressed() {
    if (this.state.mode === States.task) {
      Actions.createTask({
        realm: this.props.realm,
        project: this.props.project,
      });
    } else if (this.state.mode === States.timer) {
      Actions.addProjectHours({
        realm: this.props.realm,
        project: this.props.project,
      });
    }
  }

  timerPressed() {
    Actions.ProjectTimer();
  }

  editProject() {
    Actions.editProject();
  }

  taskState() {
    this.setState({
      mode: States.task,
      centerIconName: Icons.checkmark,
      listData: this.state.tasks,
    });
  }

  timerState() {
    this.setState({
      mode: States.timer,
      centerIconName: Icons.clock,
      listData: this.state.secondsWorked,
    });
  }

  goalsState() {
    this.setState({
      mode: States.goals,
      centerIconName: Icons.goals,
      listData: this.state.weeklyGoals,
    });
  }

  renderListItem(listData) {
    switch (this.state.mode) {
      case States.task:
        return (
          <WeeklyGoal
            thisWeeksSecondsWorked={listData.thisWeeksSecondsWorked}
            thisWeeksSecondsGoal={listData.thisWeeksSecondsGoal}
            updateWeeklyGoal
          />
        );
      case States.timer:
        return (
          <HoursWorked
            date={listData.date}
            hoursWorkedList={listData.hoursWorkedList}
          />
        );
      case States.goals:
        return (
          <Task
            description={listData.description}
            complete={listData.complete}
          />
        );
      default:
      // FIXME:  add error handling
    }
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: true,
      topRightButtonPressed: this.editProject,
      centerIconName: this.state.centerIconName,
      actionDescription: this.props.project.description,
    };

    const actionNavBarData = {
      taskNavButtonSelected: this.state.mode === States.task,
      taskNavButtonPressed: this.taskState,
      timerNavButtonSelected: this.state.mode === States.timer,
      timerNavButtonPressed: this.timerState,
      goalsNavButtonSelected: this.state.mode === States.goals,
      goalsNavButtonPressed: this.goalsState,
    };

    return (
      <View style={styles.container}>
        <ActionContainer
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={true}
          actionNavBarData={actionNavBarData}
          actionButtonActive={
            this.state.mode === States.goals || this.state.mode === States.task
          }
          actionButtonPressed={this.addPressed}
          listData={this.state.listData}
          listDataActive={true}
          renderListItem={this.renderListItem}
        />
        <ViewVisibleWrapper active={this.state.mode === States.timer}>
          <StartStopButton timerPressed={this.timerPressed} />
        </ViewVisibleWrapper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectManager;
