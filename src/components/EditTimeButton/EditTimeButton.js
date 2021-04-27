import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {Icon} from '_components';
import {Colors} from '_resources';

const EditTimeButton = ({editDescription, time, icon, editPressed}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.editDescription}>{editDescription}</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.clockContainer}>
          <Icon name={icon} size={20} style={styles.clock} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.primary,
    flexDirection: 'row',
    padding: 12,
  },
  time: {
    fontSize: 12,
    color: Colors.tertiary,
    fontWeight: 'bold',
  },
  editDescription: {
    fontSize: 12,
    color: Colors.tertiary,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  clock: {
    color: Colors.primary,
  },
  clockContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
});

export default EditTimeButton;
