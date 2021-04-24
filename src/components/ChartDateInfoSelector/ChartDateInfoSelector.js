import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const ChartDateInfoSelector = ({
  dateInfo,
  leftArrowPressed,
  rightArrowPressed,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={leftArrowPressed}
        style={styles.arrowContainer}>
        <Icon name={Icons.leftArrow} size={35} style={styles.arrow} />
      </TouchableOpacity>
      <Text style={styles.dateInfo}>{dateInfo}</Text>
      <TouchableOpacity
        onPress={rightArrowPressed}
        style={styles.arrowContainer}>
        <Icon name={Icons.rightArrow} size={35} style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
  },
  arrow: {
    color: Colors.primary,
  },
  arrowContainer: {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  dateInfo: {
    fontSize: 12,
    color: Colors.tertiary,
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default ChartDateInfoSelector;