import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';
import ActionNavBarButton from './ActionNavBarButton';

const ActionNavBar = ({
  actionNavBarActive,
  taskNavButtonActive,
  taskNavButtonPressed,
  timerNavButtonActive,
  timerNavButtonPressed,
  goalsNavButtonActive,
  goalsNavButtonPressed,
}) => {
  return (
    <View style={styles.container}>
      <ViewVisibleWrapper active={actionNavBarActive} style={styles.navBar}>
        <ActionNavBarButton
          active={taskNavButtonActive}
          description="Task"
          actionNavButtonPressed={taskNavButtonPressed}
        />
        <ActionNavBarButton
          active={timerNavButtonActive}
          description="Timer"
          actionNavButtonPressed={taskNavButtonPressed}
        />
        <ActionNavBarButton
          active={goalsNavButtonActive}
          description="Goals"
          actionNavButtonPressed={goalsNavButtonPressed}
        />
      </ViewVisibleWrapper>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  divider: {
    borderColor: Colors.primary,
    borderTopWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    /*borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    height: 16,*/
  },
  navBar: {
    flexDirection: 'row',
  },
  selectedText: {
    fontSize: 16,
    color: Colors.primary,
  },
  text: {
    fontSize: 16,
    color: Colors.tertiary,
  },
});

export default ActionNavBar;
