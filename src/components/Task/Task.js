import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';
import Completion from './Completion';

const Task = ({description, completed, taskPressed}) => {
  const descriptionStyle = completed ? styles.completed : styles.incomplete;

  return (
    <TouchableOpacity style={styles.container} onPress={taskPressed}>
      <Completion completed={completed} />
      <Text style={descriptionStyle}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completed: {
    color: Colors.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  incomplete: {
    color: Colors.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Task;
