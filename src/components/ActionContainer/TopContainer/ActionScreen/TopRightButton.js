import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';

const TopRightButton = ({
  topRightButtonActive,
  editButtonActive,
  topRightPressed,
}) => {
  return (
    <ViewVisibleWrapper
      active={topRightButtonActive}
      style={styles.container}
      onPress={topRightPressed}>
      <Text style={editButtonActive ? styles.edit : styles.remove}>
        {editButtonActive ? 'Edit' : 'Delete'}
      </Text>
    </ViewVisibleWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 24,
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
