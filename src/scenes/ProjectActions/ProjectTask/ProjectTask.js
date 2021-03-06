import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer, Task} from '_components';
import projectDB from '_data';
import {Icons} from '_constants';
import {HoursUtils} from '_utils';

class ProjectTask extends Component {
  constructor(props) {
    super(props);
    const tasks = projectDB.getTasks({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
    const project = projectDB.getProjects({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });

    this.state = {
      project,
      tasks,
    };

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
      this.setState({
        task: projectDB.getProjects({
          realm: this.props.realm,
          projectID: this.props.project.id,
        }),
      });
    });
  }

  componentWillUnmount() {
    this.state.tasks.removeAllListeners();
    this.state.project.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  addPressed() {
    Actions.createTask({
      realm: this.props.realm,
      project: this.state.project,
    });
  }

  renderTask(listData, extraData) {
    const hoursWorked = projectDB.getSecondsWorked({
      realm: extraData.realm,
      taskID: listData.id,
    });
    return (
      <Task
        hoursWorked={HoursUtils.convertSecondsToHrs({
          totalSeconds: hoursWorked,
          decimalMinutes: true,
        })}
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
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      centerIconName: Icons.checkmark,
      actionDescription: this.state.project.description,
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            project: this.state.project,
          }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionButtonActive={true}
          actionButtonPressed={this.addPressed}
          actionButtonDescription="Your Task"
          listData={this.state.tasks}
          listDataActive={true}
          renderListItem={this.renderTask}
          topBottomContainerDivider
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectTask;
