import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {HoursUtils} from '_utils';
import {Icon} from '_components';
import {Colors} from '_resources';

const EditTimeButton = ({editDescription, time, icon}) => {
  const timeAMPM = HoursUtils.dateToTimeAMPM({date: time});

  return (
    <View style={styles.container}>
      <Text style={styles.editDescription}>{editDescription}</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.time}>{timeAMPM}</Text>
        <View style={styles.clockContainer}>
          <Icon name={icon} size={24} style={styles.clock} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.primary,
    flexDirection: 'row',
    padding: 16,
  },
  time: {
    fontSize: 16,
    color: Colors.tertiary,
    fontWeight: 'bold',
  },
  editDescription: {
    fontSize: 16,
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