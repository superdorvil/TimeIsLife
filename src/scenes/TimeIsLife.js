import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ProjectNavigator from './ProjectNavigator';
import {ViewVisibleWrapper} from '_components';
// import {SettingsSchema} from '_schemas';
// import projectDB from '_data';

// import this instead?
// const Realm = require('realm');

class TimeIsLife extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realm: true, // null
    };
  }

  componentDidMount() {
    /*    Realm.open({
      schema: [SettingsSchema],
      schemaVersion: 0,
      migration: (oldRealm, newRealm) => {
        taskDB.runMigrations({oldRealm, newRealm});
      },
    }).then(realm => {
      // projectDB.initSettings({realm});

      this.setState({realm});
    });*/
  }

  componentWillUnmount() {
    /*  const {realm} = this.state;

    if (realm !== null && !realm.isClosed) {
      realm.close();
    }

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };*/
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
