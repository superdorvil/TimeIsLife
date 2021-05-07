import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';

const Time = ({time, unit}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 40,
    color: Colors.primary,
  },
  unit: {
    fontSize: 16,
    color: Colors.primary,
    justifyContent: 'flex-end',
  },
});

export default Time;
