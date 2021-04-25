import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StartEndTimeButtons} from '_components';
import {DateUtils} from '_utils';
import {Utils} from '_constants';
import {Colors} from '_resources';

const HoursWorked = ({date, hoursWorkedList}) => {
  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let dayOfWeekText = '';
  let dateText = '';
  if (DateUtils.isDateEqual({date1: date, date2: today})) {
    dayOfWeekText = 'Today';
    dateText = '';
  } else if (DateUtils.isDateEqual({date1: date, date2: yesterday})) {
    dayOfWeekText = 'Yesterday';
    dateText = '';
  } else {
    /*dayOfWeekText =
      DateUtils.convertDayToString({
        date,
        format: Utils.weekdayFormat.full,
      }) + ' ';*/
    dateText = DateUtils.convertDateToString({
      date,
      format: Utils.dateFormat.monthDateYear,
    });
  }

  const startEndTimeButtons = [];

  hoursWorkedList.forEach((hoursWorked, i) => {
    startEndTimeButtons.push(
      <StartEndTimeButtons
        startTime={hoursWorked.startTime}
        endTime={hoursWorked.endTime}
        startPressed
        endPressed
      />,
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.date}>
          Total Hours {dayOfWeekText}
          {dateText}:
        </Text>
        <Text style={styles.hours}>3.6 h</Text>
      </View>
      {startEndTimeButtons}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.tertiary,
  },
  hours: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    flex: 1,
    textAlign: 'right',
  },
});

export default HoursWorked;
