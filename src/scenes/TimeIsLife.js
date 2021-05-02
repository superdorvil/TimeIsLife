import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Realm from 'realm';
import ProjectNavigator from './ProjectNavigator';
import {ViewVisibleWrapper} from '_components';
import {
  ProjectSchema,
  SecondsWorkedSchema,
  SettingsSchema,
  TaskSchema,
  WeeklyGoalSchema,
} from '_schemas';
import projectDB from '_data';

class TimeIsLife extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realm: null,
    };
  }

  componentDidMount() {
    Realm.open({
      schema: [
        ProjectSchema,
        SecondsWorkedSchema,
        SettingsSchema,
        TaskSchema,
        WeeklyGoalSchema,
      ],
      schemaVersion: 0,
      migration: (oldRealm, newRealm) => {
        projectDB.runMigrations({oldRealm, newRealm});
      },
    }).then(realm => {
      projectDB.initSettings({realm});

      this.setState({realm});
    });
  }

  componentWillUnmount() {
    const {realm} = this.state;

    if (realm !== null && !realm.isClosed) {
      realm.close();
    }

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <ViewVisibleWrapper active={this.state.realm} style={styles.container}>
        <ProjectNavigator realm={this.state.realm} />
      </ViewVisibleWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TimeIsLife;
