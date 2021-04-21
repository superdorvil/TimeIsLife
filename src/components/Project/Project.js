import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import TotalHours from './TotalHours';
import ProjectData from './ProjectData';

const Project = ({
  projectPressed,
  description,
  secondsTotal,
  thisWeeksSecondsWorked,
  thisWeeksSecondsGoal,
}) => {
  return (
    <TouchableOpacity onPress={projectPressed} style={styles.container}>
      <TotalHours secondsTotal={secondsTotal} />
      <ProjectData
        description={description}
        secondsWorked={thisWeeksSecondsWorked}
        secondsGoal={thisWeeksSecondsGoal}
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
