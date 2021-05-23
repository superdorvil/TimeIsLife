import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';

const ActionNavBarButton = ({
  selected,
  description,
  actionNavButtonPressed,
}) => {
  return (
    <TouchableOpacity onPress={actionNavButtonPressed} style={containerStyle()}>
      <Text style={descriptionStyle(selected)}>{description}</Text>
      <ViewVisibleWrapper active={selected} style={highlightStyle()} />
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
  };
};

const descriptionStyle = selected => {
  if (selected) {
    return {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.primary[global.colorScheme],
    };
  } else {
    return {
      fontSize: 16,
      color: Colors.tertiary[global.colorScheme],
    };
  }
};

const highlightStyle = () => {
  return {
    height: 2,
    width: 90,
    backgroundColor: Colors.primary[global.colorScheme],
  };
};

export default ActionNavBarButton;
