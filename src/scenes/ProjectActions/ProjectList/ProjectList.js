import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {ActionContainer} from '_components';
import {Project} from '_components';
import {Icons} from '_constants';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    console.log('realms = ' + this.props.realm);

    this.state = {
      projects: projectDB.getProjects({realm: this.props.realm}),
      currentWeekIndex: 1, // date utils week index on current date
    };

    this.createProject = this.createProject.bind(this);
    console.log(this.state.projects);
  }

  componentDidMount() {
    this.state.projects.addListener(() => {
      this.setState({
        projects: projectDB.getProjects({realm: this.props.realm}),
      });
    });
  }

  componentWillUnmount() {
    this.state.projects.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  createProject() {
    Actions.createProject({realm: this.props.realm});
  }

  renderProject(project, extraData) {
    return (
      <Project
        projectPressed={() => Actions.projectTimer()}
        description={project.description}
        totalSecondsWorked={projectDB.getSecondsWorked({
          realm: extraData.realm,
          projectID: project.id,
        })}
        thisWeeksSecondsWorked={projectDB.getSecondsWorked({
          realm: extraData.realm,
          projectID: project.id,
          weekIndex: extraData.weekIndex,
        })}
        thisWeeksSecondsGoal={projectDB.getWeeklyGoal({
          realm: extraData.realm,
          projectID: project.id,
          weekIndex: extraData.weekIndex,
        })}
      />
    );
  }

  render() {
    const weeklyProgressData = {
      secondsGoal: 3600,
      secondsWorked: 2300,
      weekdaySeconds: [
        {weekday: new Date('Apr 11 2021'), secondsWorked: 30000},
        {weekday: new Date('Apr 12 2021'), secondsWorked: 6000},
        {weekday: new Date('Apr 13 2021'), secondsWorked: 50000},
        {weekday: new Date('Apr 14 2021'), secondsWorked: 9007},
        {weekday: new Date('Apr 15 2021'), secondsWorked: 7455},
        {weekday: new Date('Apr 16 2021'), secondsWorked: 9888},
        {weekday: new Date('Apr 17 2021'), secondsWorked: 2465},
      ],
    };

    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: true,
      topRightButtonActive: true,
      centerIconName: Icons.checkmark,
      actionDescription: 'Time is Life',
      subDescription: '',
      subDescription2: '',
    };

    const actionNavBarData = {
      taskNavButtonActive: false,
      taskNavButtonPressed: false,
      timerNavButtonActive: false,
      timerNavButtonPressed: false,
      goalsNavButtonActive: false,
      goalsNavButtonPressed: false,
    };

    return (
      <View style={styles.container}>
        <ActionContainer
          extraData={{realm: this.props.realm, weekIndex: this.state.weekIndex}}
          weeklyProgressActive
          weeklyProgressData={weeklyProgressData}
          actionScreenActive={false}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={actionNavBarData}
          topChildActive={false}
          topChild={false}
          bottomChildActive={false}
          bottomChild={false}
          actionButtonActive={true}
          actionButtonPressed={this.createProject}
          actionButtonDescription="Your Projects"
          listData={this.state.projects}
          listDataActive={true}
          renderListItem={this.renderProject}
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

export default ProjectList;
