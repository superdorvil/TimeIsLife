import React from 'react';
import {View, StyleSheet} from 'react-native';
import WeekdayHours from './WeekdayHours';

const DailyHours = ({weekdaySeconds}) => {
  const dailyHours = [];
  weekdaySeconds.forEach((weekday, i) => {
    dailyHours.push(
      <WeekdayHours
        key={i}
        secondsWorked={weekday.secondsWorked}
        weekday={weekday.weekday}
      />,
    );
  });

  return <View style={styles.container}>{dailyHours}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DailyHours;
