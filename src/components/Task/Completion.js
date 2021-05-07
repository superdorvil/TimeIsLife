import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const Completion = ({completed}) => {
  if (completed) {
    return (
      <View style={styles.checkmarkContainer}>
        <Icon size={32} style={styles.checkmark} name={Icons.checkmark} />
      </View>
    );
  } else {
    return <View style={styles.container} />;
  }
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    height: 32,
    width: 32,
    borderRadius: 32,
    marginEnd: 16,
  },
  checkmark: {
    color: Colors.primary,
  },
  checkmarkContainer: {
    marginEnd: 16,
  },
});

export default Completion;
