import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Colors} from '_resources';

const StartStopButton = ({stopMode, timerPressed}) => {
  return (
    <View style={containerStyle()}>
      <TouchableOpacity style={circleStyle()} onPress={timerPressed}>
        <Text style={textStyle()}>{stopMode ? 'Stop' : 'Start'}</Text>
        <Text style={textStyle()}>Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const containerStyle = () => {
  return {
    backgroundColor: Colors.secondary[global.colorScheme],
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.primary[global.colorScheme],
  };
};

const circleStyle = () => {
  return {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary[global.colorScheme],
  };
};

const textStyle = () => {
  return {
    fontSize: 16,
    color: Colors.primary[global.colorScheme],
  };
};

export default StartStopButton;
