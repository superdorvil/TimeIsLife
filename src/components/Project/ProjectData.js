import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {HoursProgressBar} from '_components';
import {Colors} from '_resources';

const ProjectData = ({description, secondsWorked, goalSeconds}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
      <HoursProgressBar
        secondsWorked={secondsWorked}
        goalSeconds={goalSeconds}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    color: Colors.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 6,
  },
});

export default ProjectData;
