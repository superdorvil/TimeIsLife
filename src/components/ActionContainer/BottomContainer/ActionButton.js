import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';
import {Icons} from '_constants';
import {Icon} from '_components';

const ActionButton = ({actionButtonDescription, actionButtonPressed}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.actionText}>{actionButtonDescription}</Text>
      <View style={styles.outerButtonContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={actionButtonPressed}>
          <Icon name={Icons.plus} size={16} style={styles.plus} />
        </TouchableOpacity>
      </View>
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
