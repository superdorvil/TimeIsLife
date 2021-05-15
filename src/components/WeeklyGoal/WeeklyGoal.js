import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {HoursUtils} from '_utils';
import {Colors} from '_resources';

const WeeklyGoal = ({
  thisWeeksSecondsWorked,
  thisWeeksSecondsGoal,
  updateWeeklyGoal,
  updateWeeklyGoalSlider,
}) => {
  const thisWeeksHoursWorked = HoursUtils.convertSecondsToHrs({
    totalSeconds: thisWeeksSecondsWorked,
    decimalMinutes: true,
  });
  const thisWeeksHoursGoal = HoursUtils.convertSecondsToHrs({
    totalSeconds: thisWeeksSecondsGoal,
  });
  const progress =
    thisWeeksHoursGoal > 0
      ? Math.round((thisWeeksSecondsWorked / thisWeeksSecondsGoal) * 100)
      : 0;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>This Weeks Hours: </Text>
        <Text style={styles.hours}>{thisWeeksHoursWorked} h</Text>
        <View style={styles.alignEnd}>
          <View style={styles.percentContainer}>
            <Text style={styles.percent}>{progress} %</Text>
          </View>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Goal for the week</Text>
        <View style={styles.alignEnd}>
          <Text style={styles.hours}>{thisWeeksHoursGoal} h</Text>
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={thisWeeksHoursGoal}
          minimumTrackTintColor={Colors.secondary}
          maximumTrackTintColor={Colors.secondary}
          onSlidingComplete={updateWeeklyGoal}
          onValueChange={updateWeeklyGoalSlider}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
  sliderContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.tertiary,
    flex: 1,
    height: 20,
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.tertiary,
    fontWeight: 'bold',
  },
  hours: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  percentContainer: {
    height: 50,
    width: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  percent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  alignEnd: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default WeeklyGoal;
