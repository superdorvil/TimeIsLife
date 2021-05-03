import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HoursProgressBar} from '_components';
import DailyHours from './DailyHours';
import {Colors} from '_resources';

const WeeklyProgress = ({
  thisWeeksGoalSeconds,
  thisWeeksSecondsWorked,
  weeklyHoursFontSizeBig,
  dailySecondsWorked,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timeIsLifeText}>Time Is Life</Text>
      <HoursProgressBar
        goalSeconds={thisWeeksGoalSeconds}
        secondsWorked={thisWeeksSecondsWorked}
        weeklyHoursFontSizeBig={weeklyHoursFontSizeBig}
      />
      <Text style={styles.dailyHoursText}>Daily Hours</Text>
      <DailyHours dailySecondsWorked={dailySecondsWorked} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  timeIsLifeText: {
    fontSize: 30,
    color: Colors.tertiary,
    paddingBottom: 16,
  },
  dailyHoursText: {
    fontSize: 16,
    color: Colors.tertiary,
    textAlign: 'center',
    margin: 16,
  },
});

export default WeeklyProgress;
