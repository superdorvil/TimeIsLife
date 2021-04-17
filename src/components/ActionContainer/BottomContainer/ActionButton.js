import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';
import {Icons} from '_constants';
import {Icon} from '_components';

const ActionButton = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.actionText}>Your Projects</Text>
      <TouchableOpacity style={styles.outerButtonContainer}>
        <View style={styles.buttonContainer}>
          <Icon name={Icons.plus} size={16} style={styles.plus} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  outerButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    height: 48,
    width: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: Colors.tertiary,
  },
  actionText: {
    color: Colors.tertiary,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default ActionButton;
