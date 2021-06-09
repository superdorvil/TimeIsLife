import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Colors} from '_resources';

const EditSubTask = ({subTask, subTaskPressed}) => {
  return (
    <TouchableOpacity style={containerStyle()} onPress={subTaskPressed}>
      <Text style={subTaskStyle()}>{subTask ? subTask : '+ add subtask'}</Text>
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    padding: 12,
    borderColor: Colors.primary[global.colorScheme],
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  };
};

const subTaskStyle = () => {
  return {
    fontSize: 16,
  };
};

export default EditSubTask;
