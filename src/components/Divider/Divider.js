import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '_resources';

const Divider = ({}) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 1,
    backgroundColor: Colors.tertiary,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
});

export default Divider;
