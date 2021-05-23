import React from 'react';
import {Text} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';

const TopRightButton = ({
  editButtonActive,
  deleteButtonActive,
  topRightButtonPressed,
}) => {
  let topRightText;
  if (editButtonActive) {
    topRightText = 'Edit';
  } else if (deleteButtonActive) {
    topRightText = 'Delete';
  }
  return (
    <ViewVisibleWrapper
      active={editButtonActive || deleteButtonActive}
      style={containerStyle()}
      onPress={topRightButtonPressed}>
      <Text style={topRightStyle(editButtonActive, deleteButtonActive)}>
        {topRightText}
      </Text>
    </ViewVisibleWrapper>
  );
};

const containerStyle = () => {
  return {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    right: 0,
  };
};

const topRightStyle = (editButtonActive, deleteButtonActive) => {
  if (editButtonActive) {
    return {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.primary[global.colorScheme],
    };
  }
  if (deleteButtonActive) {
    return {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.remove[global.colorScheme],
    };
  }
};

export default TopRightButton;
