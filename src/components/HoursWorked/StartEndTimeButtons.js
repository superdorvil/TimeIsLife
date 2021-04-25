import React from 'react';
import {View, StyleSheet} from 'react-native';
import {EditTimeButton} from '_components';
import {Icons} from '_constants';

const StartEndTimeButtons = ({
  startTime,
  endTime,
  startPressed,
  endPressed,
}) => {
  return (
    <View style={styles.container}>
      <EditTimeButton
        editDescription="Edit Start Time"
        time={startTime}
        icon={Icons.clock}
        editPressed={startPressed}
      />
      <View style={styles.spacing} />
      <EditTimeButton
        editDescription="Edit End Time"
        time={endTime}
        icon={Icons.clock}
        editPressed={endPressed}
      />
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
});

export default StartEndTimeButtons;
