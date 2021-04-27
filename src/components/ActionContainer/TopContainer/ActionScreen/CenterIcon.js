import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const centerIcon = ({centerIconName}) => {
  if (centerIconName === Icons.goals) {
    return (
      <View style={styles.goalContainer}>
        <Icon size={60} name={centerIconName} style={styles.goalIcon} />
      </View>
    );
  } else {
    return (
      <View style={styles.centerContainer}>
        <Icon size={70} name={centerIconName} style={styles.centerIcon} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  goalContainer: {
    backgroundColor: Colors.primary,
    width: 80,
    height: 80,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  centerContainer: {
    alignSelf: 'center',
  },
  goalIcon: {
    color: Colors.secondary,
  },
  centerIcon: {
    color: Colors.primary,
  },
});

export default centerIcon;
