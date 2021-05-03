import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {DateUtils} from '_utils';
import {ActionContainer} from '_components';
import {Project} from '_components';
import {Icons} from '_constants';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    const projects = projectDB.getProjects({realm: this.props.realm});
    const currentWeekIndex = DateUtils.getWeekIndex({date: today});
    const currentDateIndex = DateUtils.getDateIndex({date: today});
    const sundayIndex = currentDateIndex - today.getDay();
    const dailySecondsWorked = projectDB.getDailySecondsWorked({
      realm: this.props.realm,
    });
    const thisWeeksSecondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      weekIndex: currentWeekIndex,
    });
    const thisWeeksGoalSeconds = projectDB.getWeeklyGoal({
      realm: this.props.realm,
      weekIndex: currentWeekIndex,
    });

    this.state = {
      projects,
      dailySecondsWorked,
      currentWeekIndex,
      currentDateIndex,
      sundayIndex,
      today,
      thisWeeksGoalSeconds,
      thisWeeksSecondsWorked,
    };

    this.createProject = this.createProject.bind(this);
  }

  componentDidMount() {
    this.state.projects.addListener(() => {
      this.setState({
        projects: projectDB.getProjects({realm: this.props.realm}),
        dailySecondsWorked: projectDB.getDailySecondsWorked({
          realm: this.props.realm,
        }),
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
          thisWeeksGoalSeconds={this.state.thisWeeksGoalSeconds}
          thisWeeksSecondsWorked={this.state.thisWeeksSecondsWorked}
          dailySecondsWorked={this.state.dailySecondsWorked}
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
