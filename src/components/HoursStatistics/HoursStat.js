import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Divider} from '_components';
import {Colors} from '_resources';

const HoursStat = ({statistic, hours}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.statistic}>{statistic}</Text>
        <View style={styles.hoursContainer}>
          <Text style={styles.hours}>{hours} h</Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginStart: 16,
    marginEnd: 16,
    alignItems: 'center',
  },
  statistic: {
    fontSize: 12,
    color: Colors.tertiary,
    fontWeight: 'bold',
  },
  hours: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  hoursContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default HoursStat;
