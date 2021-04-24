import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';

const TopRightButton = ({
  editButtonActive,
  deleteButtonActive,
  topRightPressed,
}) => {
  let topRightStyle;
  let topRightText;
  if (editButtonActive) {
    topRightStyle = styles.edit;
    topRightText = 'Edit';
  } else if (deleteButtonActive) {
    topRightStyle = styles.remove;
    topRightText = 'Delete';
  }
  return (
    <ViewVisibleWrapper
      active={editButtonActive || deleteButtonActive}
      style={styles.container}
      onPress={topRightPressed}>
      <Text style={topRightStyle}>{topRightText}</Text>
    </ViewVisibleWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  edit: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  remove: {
    fontSize: 20,
    color: Colors.remove,
    fontWeight: 'bold',
  },
});

export default TopRightButton;
