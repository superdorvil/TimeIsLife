import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '_resources';

const ConfirmationButtons = ({okayPressed, cancelPressed}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={cancelPressed} style={styles.buttonContainer}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={okayPressed} style={styles.buttonContainer}>
        <Text style={styles.text}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.tertiary,
    position: 'absolute',
    bottom: 0,
    right: 8,
  },
  buttonContainer: {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmationButtons;
