import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Time from './Time';
import {Colors} from '_resources';

const ProjectClock = ({secondsWorked}) => {
  const timeWorked = secondsWorked;
  return (
    <View style={styles.container}>
      <Text style={styles.hoursToday}>Hours Today</Text>
      <View style={styles.circle}>
        <Time time="00" unit="h" />
        <Text style={styles.colon}> : </Text>
        <Time time="00" unit="m" />
        <Text style={styles.colon}> : </Text>
        <Time time="00" unit="s" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  circle: {
    borderColor: Colors.primary,
    borderWidth: 2,
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.45,
    borderRadius: Dimensions.get('window').width * 0.45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  hoursToday: {
    fontSize: 16,
    color: Colors.tertiary,
    textAlign: 'center',
    paddingBottom: 16,
  },
  colon: {
    fontSize: 20,
    color: Colors.primary,
  },
});

export default ProjectClock;
