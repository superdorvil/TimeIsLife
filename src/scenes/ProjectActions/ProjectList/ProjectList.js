import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer} from '_components';
import {Project} from '_components';
import {Icons} from '_constants';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.createProject = this.createProject.bind(this);
  }

  createProject() {
    Actions.createProject({realm: this.props.realm});
  }

  renderProject(projectData) {
    return (
      <Project
        projectPressed={() => Actions.projectTimer()}
        description={projectData.description}
        secondsTotal={projectData.secondsTotal}
        thisWeeksSecondsWorked={projectData.thisWeeksSecondsWorked}
        thisWeeksSecondsGoal={projectData.thisWeeksSecondsGoal}
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

    const projectData = [
      {
        description: 'Time Is Life App Design',
        secondsTotal: 359996400,
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        description: 'Spanish',
        secondsTotal: 100000,
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        description: 'Time Is Life App Design',
        secondsTotal: 100000,
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        description: 'Spanish',
        secondsTotal: 100000,
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        description: 'Time Is Life App Design',
        secondsTotal: 100000,
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        description: 'Spanish',
        secondsTotal: 100000,
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        description: 'Time Is Life App Design',
        secondsTotal: 100000,
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
      {
        description: 'Spanish',
        secondsTotal: 100000,
        thisWeeksSecondsWorked: 5000,
        thisWeeksSecondsGoal: 33000,
      },
    ];

    return (
      <View style={styles.container}>
        <ActionContainer
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
          listData={projectData}
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
