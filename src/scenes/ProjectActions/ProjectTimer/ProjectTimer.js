import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ProjectClock,
  StartStopButton,
  BackArrow,
  ConfirmationModal,
} from '_components';
import {Colors} from '_resources';
import {Icons} from '_constants';
import projectDB from '_data';
import {DateUtils} from '_utils';

class ProjectTimer extends Component {
  constructor(props) {
    super(props);

    const project = projectDB.getProjects({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
    const previousSecondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      projectID: this.props.project.id,
      dateIndex: DateUtils.getDateIndex({date: new Date()}),
    });
    let secondsWorkedTimer = project.timerActive
      ? setInterval(() => this.getSecondsWorked(), 1000)
      : null;

    this.state = {
      project,
      previousSecondsWorked,
      secondsWorkedToday: previousSecondsWorked,
      secondsWorkedTimer,
    };

    this.timerPressed = this.timerPressed.bind(this);
    this.backArrowPressed = this.backArrowPressed.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.state.project.addListener(() => {
      this.setState({
        project: projectDB.getProjects({
          realm: this.props.realm,
          projectID: this.props.project.id,
          confirmExitModalVisible: false,
        }),
      });
    });
  }

  componentWillUnmount() {
    this.state.project.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  closeModal() {
    this.setState({confirmExitModalVisible: false});
  }

  backArrowPressed() {
    if (this.state.project.timerActive) {
      this.setState({confirmExitModalVisible: true});
    } else {
      Actions.pop();
    }
  }

  getSecondsWorked() {
    const secondsWorkedToday =
      this.state.previousSecondsWorked +
      (new Date() - this.state.project.timerStartTime) / 1000;

    this.setState({secondsWorkedToday});
  }

  timerPressed() {
    if (this.state.project.timerActive) {
      projectDB.stopTimer({
        realm: this.props.realm,
        projectID: this.props.project.id,
      });

      clearInterval(this.state.secondsWorkedTimer);
    } else {
      projectDB.startTimer({
        realm: this.props.realm,
        projectID: this.props.project.id,
      });

      const secondsWorkedTimer = setInterval(
        () => this.getSecondsWorked(),
        1000,
      );
      this.setState({secondsWorkedTimer});
    }
  }

  render() {
    return (
      <View style={containerStyle()}>
        <View style={backArrowContainerStyle()}>
          <BackArrow backArrowPressed={this.backArrowPressed} />
        </View>
        <Text style={projectNameStyle()}>{this.props.project.description}</Text>
        <ProjectClock secondsWorked={this.state.secondsWorkedToday} />
        <StartStopButton
          stopMode={this.state.project.timerActive}
          timerPressed={this.timerPressed}
        />
        <ConfirmationModal
          visible={this.state.confirmExitModalVisible}
          header="Stop Timer???"
          description="Press okay and the timer will record your time."
          iconName={Icons.clock}
          okayPressed={() => {
            this.timerPressed();
            Actions.pop();
          }}
          cancelPressed={this.closeModal}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    backgroundColor: Colors.secondary[global.colorScheme],
  };
};

const projectNameStyle = () => {
  return {
    textAlign: 'center',
    fontSize: 32,
    paddingTop: 32,
    color: Colors.primary[global.colorScheme],
  };
};

const backArrowContainerStyle = () => {
  return {alignSelf: 'baseline'};
};

export default ProjectTimer;
