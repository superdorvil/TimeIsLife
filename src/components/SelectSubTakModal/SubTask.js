import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const SubTask = ({subTask, selected, subTaskPressed}) => {
  return (
    <TouchableOpacity onPress={subTaskPressed}>
      <Text>{subTask}</Text>
      {/*Radio Button {selected}*/}
    </TouchableOpacity>
  );
};

export default SubTask;
