import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';
import {Icon} from '_components';
import SelectedTabBarIcon from './SelectedTabBarIcon';

const TabBarIcon = ({name, selectedName, onPress}) => {
  if (name === selectedName) {
    return <SelectedTabBarIcon name={name} />;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Icon name={name} size={22} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
  },
  icon: {
    color: Colors.tertiary,
  },
  text: {
    color: Colors.tertiary,
  },
});

export default TabBarIcon;
