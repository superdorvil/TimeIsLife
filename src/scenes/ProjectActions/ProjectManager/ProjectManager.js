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
    const project = projectDB.getProjects({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
    this.state = {
      project,
      mode: States.timer,
      centerIconName: Icons.clock,
      tasks,
      secondsWorked,
      weeklyGoals,
      listData: secondsWorked,
      goalsMaxWeekIndex: this.props.currentWeekIndex,
      goalsMinWeekIndex: this.props.currentWeekIndex - 8,
      secondsWorkedMaxWeekIndex: this.props.currentWeekIndex,
      secondsWorkedMinWeekIndex: this.props.currentWeekIndex - 8,
      actionButtonDescription: 'Hours Worked',
    };

    this.editProject = this.editProject.bind(this);
    this.taskState = this.taskState.bind(this);
    this.timerState = this.timerState.bind(this);
    this.goalsState = this.goalsState.bind(this);
    this.timerPressed = this.timerPressed.bind(this);
    this.addPressed = this.addPressed.bind(this);
  }

  componentDidMount() {
    this.state.project.addListener(() => {
      this.setState({
        project: projectDB.getProjects({
          realm: this.props.realm,
          projectID: this.state.project.id,
        }),
      });
    });
    this.state.tasks.addListener(() => {
      this.setState({tasks: projectDB.getTasks({realm: this.props.realm})});
    });
    this.state.secondsWorked.addListener(() => {
      this.setState({
        secondsWorked: projectDB.getSecondsWorked({
          realm: this.props.realm,
          projectID: this.state.project.id,
          minimumWeekIndex: this.props.secondsWorkedMinWeekIndex,
          maximumWeekIndex: this.props.secondsWorkedMaxWeekIndex,
        }),
      });
    });
    this.state.weeklyGoals.addListener(() => {
      this.setState({
        weeklyGoals: projectDB.getWeeklyGoals({
          realm: this.props.realm,
          projectID: this.state.project.id,
          minimumWeekIndex: this.props.goalsMinWeekIndex,
          maximumWeekIndex: this.props.goalsMaxWeekIndex,
        }),
      });
    });
  }

  componentWillUnmount() {
    this.state.tasks.removeAllListeners();
    //this.state.secondsWorked.removeAllListeners();
    //this.state.weeklyGoals.removeAllListeners();
    this.state.project.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  addPressed() {
    if (this.state.mode === States.task) {
      Actions.createTask({
        realm: this.props.realm,
        project: this.state.project,
      });
    } else if (this.state.mode === States.timer) {
      Actions.addProjectHours({
        realm: this.props.realm,
        project: this.state.project,
      });
    }
  }

  timerPressed() {
    Actions.projectTimer({
      realm: this.props.realm,
      project: this.state.project,
    });
  }

  editProject() {
    Actions.editProject({realm: this.props.realm, project: this.state.project});
  }

  taskState() {
    this.setState({
      mode: States.task,
      centerIconName: Icons.checkmark,
      listData: this.state.tasks,
      actionButtonDescription: 'Your Task',
    });
  }

  timerState() {
    this.setState({
      mode: States.timer,
      centerIconName: Icons.clock,
      listData: this.state.secondsWorked,
      actionButtonDescription: 'Hours Worked',
    });
  }

  goalsState() {
    this.setState({
      mode: States.goals,
      centerIconName: Icons.goals,
      listData: this.state.weeklyGoals,
    });
  }

  renderListItem(listData, extraData) {
    switch (extraData.mode) {
      case States.task:
        return (
          <Task
            description={listData.description}
            completed={listData.completed}
            taskPressed={() => {
              projectDB.completeTask({
                realm: extraData.realm,
                taskID: listData.id,
              });
            }}
          />
        );
      case States.timer:
        return <View />;
      /*return (
          <HoursWorked
            date={listData.date}
            hoursWorkedList={listData.hoursWorkedList}
          />
        );*/
      case States.goals:
        return (
          <WeeklyGoal
            thisWeeksSecondsWorked={projectDB.getSecondsWorked({
              realm: extraData.realm,
              weekIndex: listData.weekIndex,
              projectID: listData.projectID,
            })}
            thisWeeksSecondsGoal={listData.weeklyGoalSeconds}
            updateWeeklyGoal={value => {
              projectDB.updateWeeklyGoal({
                realm: extraData.realm,
                weekIndex: listData.weekIndex,
                projectID: listData.projectID,
                weeklyGoalSeconds: value,
              });
            }}
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
      actionDescription: this.state.project.description,
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
          extraData={{
            realm: this.props.realm,
            mode: this.state.mode,
          }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={true}
          actionNavBarData={actionNavBarData}
          actionButtonActive={
            this.state.mode === States.timer || this.state.mode === States.task
          }
          actionButtonPressed={this.addPressed}
          actionButtonDescription={this.state.actionButtonDescription}
          listData={this.state.listData}
          listDataActive={true}
          renderListItem={this.renderListItem}
        />
        <ViewVisibleWrapper active={this.state.mode === States.timer}>
          <StartStopButton stopMode={false} timerPressed={this.timerPressed} />
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
