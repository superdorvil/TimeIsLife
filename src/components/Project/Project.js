import React from 'react';
import {TouchableOpacity} from 'react-native';
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
    <TouchableOpacity onPress={projectPressed} style={containerStyle()}>
      <TotalHours totalSecondsWorked={totalSecondsWorked} />
      <ProjectData
        description={description}
        secondsWorked={thisWeeksSecondsWorked}
        goalSeconds={thisWeeksSecondsGoal}
      />
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {flexDirection: 'row'};
};

export default Project;
