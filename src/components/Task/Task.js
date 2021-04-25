import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';
import Completion from './Completion';

const Task = ({description, complete}) => {
  const descriptionStyle = complete ? styles.complete : styles.incomplete;

  return (
    <TouchableOpacity style={styles.container}>
      <Completion complete={complete} />
      <Text style={descriptionStyle}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  complete: {
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
