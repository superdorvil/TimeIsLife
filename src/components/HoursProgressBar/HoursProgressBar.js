import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import {HoursUtils} from '_utils';
import {Colors} from '_resources';

const HoursProgressBar = ({
  progress,
  secondsWorked,
  secondsGoal,
  totalWeeklyHours,
}) => {
  const hoursWorked = HoursUtils.convertSecondsToHrs({
    totalSeconds: secondsWorked,
    decimalMinutes: true,
  });
  const hoursGoal = HoursUtils.convertSecondsToHrs({
    totalSeconds: secondsGoal,
  });
  const weeklyHours = totalWeeklyHours ? (
    <Text style={styles.weeklyHours16}>Weekly Hours</Text>
  ) : (
    <Text style={styles.weeklyHours12}>Weekly Hours</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.weeklyHoursContainer}>
        {weeklyHours}
        <View style={styles.hoursWorkedContainer}>
          <Text style={styles.hoursWorked}>{hoursWorked} h</Text>
          <Text style={styles.hoursGoal}>
            {'  /  '}
            {hoursGoal} h
          </Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <ProgressBar
          animated
          progress={progress}
          color={Colors.primary}
          unfilledColor={Colors.tertiary}
          borderWidth={progress > 0 ? 1 : 0}
          height={6}
          width={null}
          borderTopLeftRadius={4}
          borderTopRightRadius={4}
          borderBottomLeftRadius={4}
          borderBottomRightRadius={4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  weeklyHoursContainer: {
    flexDirection: 'row',
  },
  hoursWorkedContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  weeklyHours12: {
    fontSize: 16,
    color: Colors.tertiary,
  },
  weeklyHours16: {
    fontSize: 12,
    color: Colors.tertiary,
  },
  hoursWorked: {
    fontSize: 16,
    color: Colors.primary,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  hoursGoal: {
    fontSize: 12,
    color: Colors.tertiary,
    alignSelf: 'flex-end',
  },
  progressBar: {
    paddingTop: 12,
  },
});

export default HoursProgressBar;
