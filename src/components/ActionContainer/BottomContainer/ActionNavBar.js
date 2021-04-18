import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';
import ActionNavBarButton from './ActionNavBarButton';

const ActionNavBar = ({
  navBarActive,
  taskActive,
  taskNavButton,
  timerActive,
  timerNavButton,
  goalsActive,
  goalsNavButton,
}) => {
  return (
    <View style={styles.container}>
      <ViewVisibleWrapper active={navBarActive} style={styles.navBar}>
        <ActionNavBarButton
          active={taskActive}
          description="Task"
          navButtonPressed={taskNavButton}
        />
        <ActionNavBarButton
          active={timerActive}
          description="Timer"
          navButtonPressed={taskNavButton}
        />
        <ActionNavBarButton
          active={goalsActive}
          description="Goals"
          navButtonPressed={goalsNavButton}
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
