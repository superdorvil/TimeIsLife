import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';
import {DateUtils, HoursUtils} from '_utils';
import {Utils} from '_constants';

const WeekdayHours = ({secondsWorked, weekday}) => {
  const hoursWorked = HoursUtils.convertSecondsToHrs({
    totalSeconds: secondsWorked,
    decimalMinutes: true,
  });
  const todayString = DateUtils.convertDayToString({
    date: new Date(),
    format: Utils.weekdayFormat.abbreviation_capital,
  });
  let todayActive = false;
  if (weekday === todayString) {
    todayActive = true;
  }
  const textStyle = todayActive ? styles.todayText : styles.weekdayText;
  const dividerStyle = todayActive
    ? styles.todayDivider
    : styles.weekdayDivider;

  return (
    <View style={styles.container}>
      <Text style={textStyle}>{hoursWorked} h</Text>
      <View style={dividerStyle} />
      <Text style={textStyle}>{weekday}</Text>
      <ViewVisibleWrapper active={todayActive} style={styles.todayHighlight} />
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
