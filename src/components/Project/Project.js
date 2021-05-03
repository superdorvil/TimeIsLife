import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import TotalHours from './TotalHours';
import ProjectData from './ProjectData';

const Project = ({
  projectPressed,
  description,
  totalSecondsWorked,
  thisWeeksSecondsWorked,
  thisWeeksSecondsGoal,
}) => {
  return (
    <TouchableOpacity onPress={projectPressed} style={styles.container}>
      <TotalHours totalSecondsWorked={totalSecondsWorked} />
      <ProjectData
        description={description}
        secondsWorked={thisWeeksSecondsWorked}
        goalSeconds={thisWeeksSecondsGoal}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Project;
