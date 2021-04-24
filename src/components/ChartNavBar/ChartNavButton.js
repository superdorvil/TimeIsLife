import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '_resources';

const ChartNavButton = ({description, selected, navButtonPressed}) => {
  const descriptionStyle = selected
    ? styles.selectedDescription
    : styles.description;
  const containerStyle = selected ? styles.selectedContainer : styles.container;

  return (
    <TouchableOpacity style={containerStyle} onPress={navButtonPressed}>
      <Text style={descriptionStyle}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 4,
    paddingTop: 6,
    paddingBottom: 6,
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 30,
  },
  selectedContainer: {
    marginTop: 4,
    marginBottom: 4,
    paddingTop: 6,
    paddingBottom: 6,
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 30,
  },
  description: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  selectedDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.secondary,
    borderRadius: 20,
  },
});

export default ChartNavButton;
