import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';

const StartStopButton = ({stopMode, timerPressed}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={timerPressed}>
        <Text style={styles.text}>{stopMode ? 'Stop' : 'Start'}</Text>
        <Text style={styles.text}>Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 16,
    color: Colors.primary,
  },
});

export default StartStopButton;
