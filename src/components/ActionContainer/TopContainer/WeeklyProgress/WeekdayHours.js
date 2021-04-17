import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';

const WeekdayHours = ({secondsWorked, weekday}) => {
  const hoursWorked = secondsWorked; // FIXME:: convert me to hours
  const weekdayString = weekday; // FIXME:: convert me to weekday string
  const today = weekday === new Date().getDay() ? true : false;
  const textStyle = today ? styles.todayText : styles.weekdayText;
  const dividerStyle = today ? styles.todayDivider : styles.weekdayDivider;

  return (
    <View style={styles.container}>
      <Text style={textStyle}>{hoursWorked} h</Text>
      <View style={dividerStyle} />
      <Text style={textStyle}>{weekdayString}</Text>
      <ViewVisibleWrapper active={today} style={styles.todayHighlight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  todayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.tertiary,
  },
  todayDivider: {
    width: 1,
    height: 12,
    backgroundColor: Colors.primary,
  },
  weekdayDivider: {
    width: 1,
    height: 12,
    backgroundColor: Colors.tertiary,
  },
  todayHighlight: {
    backgroundColor: Colors.primary,
    width: 28,
    height: 1,
    position: 'absolute',
    bottom: -2,
  },
});

export default WeekdayHours;
