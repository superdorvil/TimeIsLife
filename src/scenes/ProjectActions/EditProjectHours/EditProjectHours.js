import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer, HoursWorked, TimeSelector} from '_components';
import projectDB from '_data';
import {Icons, States} from '_constants';
import {InputUtils} from '_utils';

class EditProjectHours extends Component {
  constructor(props) {
    super(props);
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

    this.state = {
      project,
      secondsWorked,
      secondsWorkedDisplay,
      startTimeModalVisible: false,
      endTimeModalVisible: false,
      setTimeHours: 0,
      setTimeMinutes: 0,
      ampm: States.am,
      secondsWorkedID: 0,
    };

    this.addPressed = this.addPressed.bind(this);
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
    Actions.addProjectHours({
      realm: this.props.realm,
      project: this.state.project,
    });
  }

  renderHoursWorked(listData, extraData) {
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
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      centerIconName: Icons.clock,
      actionDescription: this.state.project.description,
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            project: this.state.project,
            openStartTimeModal: this.openStartTimeModal,
            openEndTimeModal: this.openEndTimeModal,
          }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionButtonActive={true}
          actionButtonPressed={this.addPressed}
          actionButtonDescription="Hours Worked"
          listData={this.state.secondsWorkedDisplay}
          listDataActive={true}
          renderListItem={this.renderHoursWorked}
          topBottomContainerDivider
        />
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

export default EditProjectHours;
