import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Time from './Time';
import {Colors} from '_resources';

const ProjectClock = ({secondsWorked}) => {
  const timeWorked = secondsWorked;
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={styles.timeContainer}>
          <Time time="00" unit="h" />
          <Text style={styles.colon}> : </Text>
          <Time time="00" unit="m" />
          <Text style={styles.colon}> : </Text>
          <Time time="00" unit="s" />
        </View>
        <Text style={styles.hoursToday}>Hours Today</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.primary,
  },
  circle: {
    borderColor: Colors.primary,
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75,
    borderRadius: Dimensions.get('window').width * 0.75,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoursToday: {
    fontSize: 16,
    color: Colors.primary,
    paddingTop: 8,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  colon: {
    fontSize: 32,
    color: Colors.primary,
  },
});

export default ProjectClock;
