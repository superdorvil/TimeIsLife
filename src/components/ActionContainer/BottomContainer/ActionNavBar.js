import React from 'react';
import {View} from 'react-native';
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
    <View style={containerStyle()}>
      <ViewVisibleWrapper active={actionNavBarActive} style={navBarStyle()}>
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
      <View style={dividerStyle(actionNavBarActive)} />
    </View>
  );
};

const dividerStyle = actionNavBarActive => {
  if (actionNavBarActive) {
    return {
      borderTopWidth: 1,
      borderColor: Colors.primary[global.colorScheme],
    };
  } else {
    return {
      borderTopWidth: 1,
      marginTop: 16,
      borderColor: Colors.primary[global.colorScheme],
    };
  }
};

const navBarStyle = () => {
  return {
    flexDirection: 'row',
    paddingTop: 16,
  };
};

const containerStyle = () => {
  return {};
};

export default ActionNavBar;
