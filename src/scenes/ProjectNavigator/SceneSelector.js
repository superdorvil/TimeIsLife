import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icons} from '_constants';
import {
  ManageSettings,
  ManageWeeklyGoals,
  ProjectList,
  ViewProjectCharts,
} from '../ProjectActions';

const SceneSelector = ({scene, realm}) => {
  let selectedScene;

  switch (scene) {
    case Icons.projects:
      selectedScene = <ProjectList realm={realm} />;
      break;
    case Icons.goals:
      selectedScene = <ManageWeeklyGoals realm={realm} />;
      break;
    case Icons.charts:
      selectedScene = <ViewProjectCharts realm={realm} />;
      break;
    case Icons.settings:
      selectedScene = <ManageSettings realm={realm} />;
      break;
    default:
      selectedScene = (
        <Text>I should really figure out proper error handling react</Text>
      );
  }

  return <View style={styles.container}>{selectedScene}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SceneSelector;
