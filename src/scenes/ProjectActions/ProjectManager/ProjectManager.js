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
import {HoursUtils} from '_utils';

class ProjectManager extends Component {
  constructor(props) {
    super(props);

    const tasks = projectDB.getTasks({realm: this.props.realm});
    const secondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      projectID: this.props.project.id,
      limit: 35,
    });
    const secondsWorkedDisplay = this.formatSecondsWorked(secondsWorked);
    const project = projectDB.getProjects({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
    const weeklyGoalWeekIndexes = []; // 10 weeks
    for (let i = 0; i < 10; i++) {
      weeklyGoalWeekIndexes.push({weekIndex: this.props.currentWeekIndex - i});
    }

    this.state = {
      project,
      mode: States.timer,
      centerIconName: Icons.clock,
      tasks,
      secondsWorked,
      secondsWorkedDisplay,
      weeklyGoalWeekIndexes,
      listData: secondsWorkedDisplay,
      actionButtonDescription: 'Hours Worked',
    };

    this.editProject = this.editProject.bind(this);
    this.taskState = this.taskState.bind(this);
    this.timerState = this.timerState.bind(this);
    this.goalsState = this.goalsState.bind(this);
    this.timerPressed = this.timerPressed.bind(this);
    this.addPressed = this.addPressed.bind(this);
    this.updateWeeklyGoal = this.updateWeeklyGoal.bind(this);
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
      const secondsWorked = projectDB.getSecondsWorked({
        realm: this.props.realm,
        projectID: this.props.project.id,
        limit: 35,
      });
      const secondsWorkedDisplay = this.formatSecondsWorked(secondsWorked);
      this.setState({
        secondsWorked,
        secondsWorkedDisplay,
      });
      this.setState({
        secondsWorked: projectDB.getSecondsWorked({
          realm: this.props.realm,
          projectID: this.state.project.id,
          minimumWeekIndex: this.props.secondsWorkedMinWeekIndex,
          maximumWeekIndex: this.props.secondsWorkedMaxWeekIndex,
        }),
      });
    });
  }

  componentWillUnmount() {
    this.state.tasks.removeAllListeners();
    //this.state.secondsWorked.removeAllListeners();
    this.state.project.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  formatSecondsWorked(secondsWorked) {
    const secondsWorkedDisplay = [];
    let swHelper = [];
    let currentDateIndex = 0;

    secondsWorked.forEach((sw, i) => {
      if (currentDateIndex === 0) {
        currentDateIndex = sw.dateIndex;
      }

      if (currentDateIndex !== sw.dateIndex) {
        secondsWorkedDisplay.push({
          secondsWorkedList: swHelper,
          date: swHelper[0].startTime,
        });

        swHelper = [];
      } else {
        swHelper.push({
          id: sw.id,
          startTime: sw.startTime,
          endTime: sw.endTime,
        });
      }
    });

    secondsWorkedDisplay.push({
      secondsWorkedList: swHelper,
      date: swHelper[0].startTime,
    });

    return secondsWorkedDisplay;
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
      listData: this.state.secondsWorkedDisplay,
      actionButtonDescription: 'Hours Worked',
    });
  }

  goalsState() {
    this.setState({
      mode: States.goals,
      centerIconName: Icons.goals,
      listData: this.state.weeklyGoalWeekIndexes,
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
        return (
          <HoursWorked
            date={listData.date}
            secondsWorkedList={listData.secondsWorkedList}
          />
        );
      case States.goals:
        return (
          <WeeklyGoal
            thisWeeksSecondsWorked={projectDB.getSecondsWorked({
              realm: extraData.realm,
              weekIndex: listData.weekIndex,
              projectID: extraData.project.id,
            })}
            thisWeeksSecondsGoal={projectDB.getWeeklyGoals({
              realm: extraData.realm,
              weekIndex: listData.weekIndex,
              projectID: extraData.project.id,
            })}
            updateWeeklyGoal={value => {
              extraData.updateWeeklyGoal(
                extraData.realm,
                listData.weekIndex,
                extraData.project.id,
                value,
              );
            }}
          />
        );
      default:
      // FIXME:  add error handling
    }
  }

  updateWeeklyGoal(realm, weekIndex, projectID, value) {
    projectDB.updateWeeklyGoal({
      realm: realm,
      weekIndex: weekIndex,
      projectID: projectID,
      weeklyGoalSeconds: HoursUtils.convertHrsMinsSecsToSeconds({hours: value}),
    });

    this.setState({
      listData: this.state.weeklyGoalWeekIndexes,
      weeklyGoalWeekIndexes: this.state.weeklyGoalWeekIndexes,
    });
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
            project: this.state.project,
            updateWeeklyGoal: this.updateWeeklyGoal,
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
