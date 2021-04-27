import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';
import ActionNavBarButton from './ActionNavBarButton';

const ActionNavBar = ({
  actionNavBarActive,
  taskNavButtonSelected,
  taskNavButtonPressed,
  timerNavButtonSelected,
  timerNavButtonPressed,
  goalsNavButtonSelected,
  goalsNavButtonPressed,
}) => {
  return (
    <View style={styles.container}>
      <ViewVisibleWrapper active={actionNavBarActive} style={styles.navBar}>
        <ActionNavBarButton
          selected={taskNavButtonSelected}
          description="Task"
          actionNavButtonPressed={taskNavButtonPressed}
        />
        <ActionNavBarButton
          selected={timerNavButtonSelected}
          description="Timer"
          actionNavButtonPressed={timerNavButtonPressed}
        />
        <ActionNavBarButton
          selected={goalsNavButtonSelected}
          description="Goals"
          actionNavButtonPressed={goalsNavButtonPressed}
        />
      </ViewVisibleWrapper>
      <View
        style={actionNavBarActive ? styles.navBarDivider : styles.divider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  divider: {
    borderColor: Colors.primary,
    borderTopWidth: 1,
    marginTop: 16,
  },
  navBarDivider: {
    borderColor: Colors.primary,
    borderTopWidth: 1,
  },
  navBar: {
    flexDirection: 'row',
    paddingTop: 16,
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
