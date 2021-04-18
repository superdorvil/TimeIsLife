import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';

const ActionNavBarButton = ({active, description, navButtonPressed}) => {
  return (
    <TouchableOpacity
      navButtonPressed={navButtonPressed}
      style={styles.container}>
      <Text style={active ? styles.activeDescription : styles.description}>
        {description}
      </Text>
      <ViewVisibleWrapper active={active} style={styles.highlight} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
  },
  description: {
    fontSize: 20,
    color: Colors.tertiary,
  },
  activeDescription: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  highlight: {
    backgroundColor: Colors.primary,
    height: 2,
    width: 90,
  },
});

export default ActionNavBarButton;
