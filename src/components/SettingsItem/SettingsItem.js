import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const SettingsItem = ({description, settingsPressed}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={settingsPressed}>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.arrowContainer}>
        <Icon name={Icons.rightArrow} size={24} style={styles.arrow} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.primary,
  },
  arrow: {
    color: Colors.primary,
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  description: {
    fontSize: 16,
    color: Colors.tertiary,
  },
});

export default SettingsItem;
