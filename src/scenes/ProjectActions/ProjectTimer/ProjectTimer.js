import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ProjectClock, StartStopButton} from '_components';
import {Colors} from '_resources';

class ProjectTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.timerPressed = this.timerPressed.bind(this);
  }

  timerPressed() {}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.projectName}>Time Is Life</Text>
        <ProjectClock />
        <StartStopButton timerPressed={this.timerPressed} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  projectName: {
    textAlign: 'center',
    fontSize: 32,
    paddingTop: 32,
    color: Colors.primary,
  },
});

export default ProjectTimer;
