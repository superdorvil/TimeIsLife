import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ActionContainer,
  StartStopButton,
  HoursWorked,
  WeeklyGoal,
  Task,
  ViewVisibleWrapper,
  TimeSelector,
} from '_components';
import projectDB from '_data';
import {Icons, States} from '_constants';
import {HoursUtils, InputUtils} from '_utils';

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
      weeklyGoalWeekIndexes.push({
        index: i,
        weekIndex: this.props.currentWeekIndex - i,
        thisWeeksSecondsGoal: projectDB.getWeeklyGoals({
          realm: this.props.realm,
          weekIndex: this.props.currentWeekIndex - i,
          projectId: this.props.project.id,
        }),
      });
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
      startTimeModalVisible: false,
      endTimeModalVisible: false,
      setTimeHours: 0,
      setTimeMinutes: 0,
      ampm: States.am,
      secondsWorkedID: 0,
    };

    this.editProject = this.editProject.bind(this);
    this.taskState = this.taskState.bind(this);
    this.timerState = this.timerState.bind(this);
    this.goalsState = this.goalsState.bind(this);
    this.timerPressed = this.timerPressed.bind(this);
    this.addPressed = this.addPressed.bind(this);
    this.updateWeeklyGoal = this.updateWeeklyGoal.bind(this);
    this.updateWeeklyGoalSlider = this.updateWeeklyGoalSlider.bind(this);
    this.ampmPressed = this.ampmPressed.bind(this);
    this.openStartTimeModal = this.openStartTimeModal.bind(this);
    this.openEndTimeModal = this.openEndTimeModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateSetTimeHours = this.updateSetTimeHours.bind(this);
    this.updateSetTimeMinutes = this.updateSetTimeMinutes.bind(this);
    this.updateSecondsWorked = this.updateSecondsWorked.bind(this);
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
        projectID: this.state.project.id,
        limit: 35,
      });
      const secondsWorkedDisplay = this.formatSecondsWorked(secondsWorked);
      this.setState({
        secondsWorked,
        secondsWorkedDisplay,
        listData: secondsWorkedDisplay,
      });
    });
  }

  componentWillUnmount() {
    this.state.secondsWorked.removeAllListeners();
    this.state.tasks.removeAllListeners();
    this.state.project.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  openStartTimeModal(secondsWorkedID) {
    this.setState({startTimeModalVisible: true, secondsWorkedID});
  }

  openEndTimeModal(secondsWorkedID) {
    this.setState({endTimeModalVisible: true, secondsWorkedID});
  }

  closeModal() {
    this.setState({
      startTimeModalVisible: false,
      endTimeModalVisible: false,
    });
  }

  updateSetTimeHours(value) {
    this.setState({
      setTimeHours: InputUtils.numberRangeInput({min: 0, max: 23, value}),
    });
  }

  updateSetTimeMinutes(value) {
    this.setState({
      setTimeMinutes: InputUtils.numberRangeInput({min: 0, max: 59, value}),
    });
  }

  ampmPressed(ampm) {
    this.setState({ampm});
  }

  updateSecondsWorked() {
    projectDB.updateSecondsWorked({
      realm: this.props.realm,
      secondsWorkedID: this.state.secondsWorkedID,
      hours: this.state.setTimeHours,
      minutes: this.state.setTimeMinutes,
      updateStartTime: this.state.startTimeModalVisible,
    });

    this.closeModal();
  }

  formatSecondsWorked(secondsWorked) {
    const secondsWorkedDisplay = [];
    let swHelper = [];
    let currentDateIndex = 0;

    if (secondsWorked.length > 0) {
      currentDateIndex = secondsWorked[0].dateIndex;

      for (let i = 0; i < secondsWorked.length; i++) {
        if (currentDateIndex !== secondsWorked[i].dateIndex) {
          secondsWorkedDisplay.push({
            secondsWorkedList: swHelper,
            date: swHelper[0].startTime,
          });

          swHelper = [];
          currentDateIndex = secondsWorked[i].dateIndex;
        }

        swHelper.push({
          id: secondsWorked[i].id,
          startTime: secondsWorked[i].startTime,
          endTime: secondsWorked[i].endTime,
        });

        // last element
        if (i === secondsWorked.length - 1) {
          secondsWorkedDisplay.push({
            secondsWorkedList: swHelper,
            date: swHelper[0].startTime,
          });
        }
      }
    }

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
            editStartTime={secondsWorkedID =>
              extraData.openStartTimeModal(secondsWorkedID)
            }
            editEndTime={secondsWorkedID =>
              extraData.openEndTimeModal(secondsWorkedID)
            }
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
            thisWeeksSecondsGoal={listData.thisWeeksSecondsGoal}
            updateWeeklyGoal={value => {
              extraData.updateWeeklyGoal(
                extraData.realm,
                listData.weekIndex,
                extraData.project.id,
                value,
              );
            }}
            updateWeeklyGoalSlider={value => {
              extraData.updateWeeklyGoalSlider(value, listData.index);
            }}
            weekIndex={listData.weekIndex}
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

  updateWeeklyGoalSlider(value, index) {
    const weeklyGoalWeekIndexes = this.state.weeklyGoalWeekIndexes;
    weeklyGoalWeekIndexes[index].thisWeeksSecondsGoal = value * 3600;

    this.setState({weeklyGoalWeekIndexes});
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
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            mode: this.state.mode,
            project: this.state.project,
            updateWeeklyGoal: this.updateWeeklyGoal,
            updateWeeklyGoalSlider: this.updateWeeklyGoalSlider,
            openStartTimeModal: this.openStartTimeModal,
            openEndTimeModal: this.openEndTimeModal,
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
        <TimeSelector
          visible={
            this.state.startTimeModalVisible || this.state.endTimeModalVisible
          }
          setTimeDescription={
            this.state.startTimeModalVisible ? 'Set Start Time' : 'Set End Time'
          }
          hours={this.state.setTimeHours}
          minutes={this.state.setTimeMinutes}
          updateHours={this.updateSetTimeHours}
          updateMinutes={this.updateSetTimeMinutes}
          amPressed={() => this.ampmPressed(States.am)}
          pmPressed={() => this.ampmPressed(States.pm)}
          ampm={this.state.ampm}
          okayPressed={this.updateSecondsWorked}
          cancelPressed={this.closeModal}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectManager;
