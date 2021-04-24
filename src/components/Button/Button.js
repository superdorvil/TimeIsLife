import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Colors} from '_resources';

const Button = ({description, buttonPressed}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={buttonPressed}>
      <Text style={styles.description}>+ {description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 16,
    width: Dimensions.get('window').width - 32,
  },
  description: {
    fontWeight: 'bold',
    color: Colors.secondary,
    fontSize: 16,
  },
  plus: {
    color: Colors.secondary,
  },
});

export default Button;
