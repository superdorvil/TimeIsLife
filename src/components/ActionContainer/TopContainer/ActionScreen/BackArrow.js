import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const BackArrow = ({backArrowPressed}) => {
  return (
    <TouchableOpacity onPress={backArrowPressed} style={styles.container}>
      <Icon name={Icons.leftArrow} size={24} style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'baseline',
  },
  arrow: {
    color: Colors.tertiary,
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
});

export default BackArrow;
