import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';
import {Icon} from '_components';

const SelectedTabBarIcon = ({name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Icon name={name} size={30} style={styles.icon} />
    </View>
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
    color: Colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default SelectedTabBarIcon;
