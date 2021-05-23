import React from 'react';
import {View} from 'react-native';
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
    <View style={containerStyle()}>
      <View style={endTimeContainerStyle()}>
        <EditTimeButton
          editDescription="Start Time"
          time={HoursUtils.dateToTimeAMPM({date: startTime})}
          icon={Icons.clock}
          editPressed={startPressed}
        />
      </View>
      <View style={spacingStyle()} />
      <View style={endTimeContainerStyle()}>
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

const containerStyle = () => {
  return {flexDirection: 'row'};
};

const spacingStyle = () => {
  return {padding: 16};
};

const endTimeContainerStyle = () => {
  return {flex: 1};
};

export default StartEndTimeButtons;
