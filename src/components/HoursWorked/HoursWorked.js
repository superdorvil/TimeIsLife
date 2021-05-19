import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StartEndTimeButtons} from '_components';
import {DateUtils, HoursUtils} from '_utils';
import {Utils} from '_constants';
import {Colors} from '_resources';

const HoursWorked = ({date, secondsWorkedList, editStartTime, editEndTime}) => {
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
  let totalSeconds = 0;
  const startEndTimeButtons = [];

  secondsWorkedList.forEach((secondsWorked, i) => {
    startEndTimeButtons.push(
      <View style={styles.startEndTimeButtonsContainer} key={i}>
        <StartEndTimeButtons
          startTime={secondsWorked.startTime}
          endTime={secondsWorked.endTime}
          startPressed={() => editStartTime(secondsWorked.id)}
          endPressed={() => editEndTime(secondsWorked.id)}
        />
      </View>,
    );
    totalSeconds =
      totalSeconds + (secondsWorked.endTime - secondsWorked.startTime);
  });
  const totalHours = HoursUtils.convertSecondsToHrs({
    totalSeconds: totalSeconds / 1000,
    decimalMinutes: true,
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.date}>
          Total Hours {dayOfWeekText}
          {dateText}:
        </Text>
        <Text style={styles.hours}>{totalHours} h</Text>
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
  startEndTimeButtonsContainer: {
    marginBottom: 8,
  },
});

export default HoursWorked;
