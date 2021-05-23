import React from 'react';
import {Text, View} from 'react-native';
import {HoursProgressBar} from '_components';
import {Colors} from '_resources';

const ProjectData = ({description, secondsWorked, goalSeconds}) => {
  return (
    <View style={containerStyle()}>
      <Text style={descriptionStyle()}>{description}</Text>
      <HoursProgressBar
        secondsWorked={secondsWorked}
        goalSeconds={goalSeconds}
      />
    </View>
  );
};

const containerStyle = () => {
  return {flex: 1};
};

const descriptionStyle = () => {
  return {
    color: Colors.tertiary[global.colorScheme],
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 6,
  };
};

export default ProjectData;
