import React from 'react';
import {View, StyleSheet} from 'react-native';
import {EditTimeButton} from '_components';
import {HoursUtils} from '_utils';
import {Icons} from '_constants';

const StartEndTimeButtons = ({
  startTime,
  endTime,
  startPressed,
  endPressed,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.editTimeContainer}>
        <EditTimeButton
          editDescription="Start Time"
          time={HoursUtils.dateToTimeAMPM({date: startTime})}
          icon={Icons.clock}
          editPressed={startPressed}
        />
      </View>
      <View style={styles.spacing} />
      <View style={styles.editTimeContainer}>
        <EditTimeButton
          editDescription="End Time"
          time={HoursUtils.dateToTimeAMPM({date: endTime})}
          icon={Icons.clock}
          editPressed={endPressed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  spacing: {
    padding: 16,
  },
  editTimeContainer: {
    flex: 1,
  },
});

export default StartEndTimeButtons;
