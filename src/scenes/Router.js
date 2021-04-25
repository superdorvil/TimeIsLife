import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import ProjectNavigator from './ProjectNavigator';
import TimeIsLife from './TimeIsLife';
import {
  CreateProject,
  CreateTask,
  EditProject,
  AddProjectHours,
  ManageSettings,
  ManageWeeklyGoals,
  ProjectList,
  ProjectTimer,
  ViewProjectCharts,
} from './ProjectActions';

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="timeIsLife"
        component={TimeIsLife}
        title="TimeIsLife"
        hideNavBar
        initial
      />
      <Scene
        key="projectNavigator"
        component={ProjectNavigator}
        title="ProjectNavigator"
        hideNavBar
      />
      <Scene
        key="createProject"
        component={CreateProject}
        title="CreateProject"
        hideNavBar
      />
      <Scene
        key="createTask"
        component={CreateTask}
        title="CreateTask"
        hideNavBar
      />
      <Scene
        key="editProject"
        component={EditProject}
        title="EditProject"
        hideNavBar
      />
      <Scene
        key="manageSettings"
        component={ManageSettings}
        title="ManageSettings"
        hideNavBar
      />
      <Scene
        key="manageWeeklyGoals"
        component={ManageWeeklyGoals}
        title="ManageWeeklyGoals"
        hideNavBar
      />
      <Scene
        key="projectList"
        component={ProjectList}
        title="ProjectList"
        hideNavBar
      />
      <Scene
        key="projectTimer"
        component={ProjectTimer}
        title="ProjectTimer"
        hideNavBar
      />
      <Scene
        key="viewProjectCharts"
        component={ViewProjectCharts}
        title="ViewProjectCharts"
        hideNavBar
      />
      <Scene
        key="addProjectHours"
        component={AddProjectHours}
        title="addProjectHours"
        hideNavBar
        initial
      />
    </Scene>
  </Router>
);

export default RouterComponent;
