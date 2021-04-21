import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HoursUtils} from '_utils';
import {Colors} from '_resources';

const TotalHours = ({secondsTotal}) => {
  let totalHours = HoursUtils.convertSecondsToHrs({
    totalSeconds: secondsTotal,
    decimalMinutes: true,
  });

  if (totalHours > 999) {
    totalHours = HoursUtils.convertSecondsToHrs({
      totalSeconds: secondsTotal,
      decimalMinutes: false,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.totalHoursContainer}>
        <Text style={styles.totalHours}>{totalHours} h</Text>
      </View>
      <Text style={styles.totalHoursText}>total hrs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginEnd: 16,
  },
  totalHours: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  totalHoursText: {
    color: Colors.tertiary,
  },
  totalHoursContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: Colors.primary,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
});

export default TotalHours;
