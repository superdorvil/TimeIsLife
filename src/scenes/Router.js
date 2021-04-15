import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import {ProjectList} from './ProjectActions';
import TimeIsLife from './TimeIsLife';

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
        key="projectList"
        component={ProjectList}
        title="ProjectList"
        hideNavBar
      />
    </Scene>
  </Router>
);

export default RouterComponent;
