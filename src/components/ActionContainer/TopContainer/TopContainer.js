import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import WeeklyProgress from './WeeklyProgress';
import ActionScreen from './ActionScreen';

const TopContainer = ({
  weeklyProgressActive,
  progress,
  secondsGoal,
  secondsWorked,
  weekdaySeconds,
  backArrowPressed,
  centerIconName,
  actionDescription,
  subDescription,
  subDescription2,
  editButtonActive,
  topRightButtonActive,
}) => {
  return (
    <View style={styles.container}>
      <ViewVisibleWrapper active={weeklyProgressActive}>
        <WeeklyProgress
          progress={progress}
          secondsGoal={secondsGoal}
          secondsWorked={secondsWorked}
          weekdaySeconds={weekdaySeconds}
        />
      </ViewVisibleWrapper>
      <ViewVisibleWrapper active={!weeklyProgressActive}>
        <ActionScreen
          backArrowPressed={backArrowPressed}
          centerIconName={centerIconName}
          actionDescription={actionDescription}
          subDescription={subDescription}
          subDescription2={subDescription2}
          editButtonActive={editButtonActive}
          topRightButtonActive={topRightButtonActive}
        />
      </ViewVisibleWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

export default TopContainer;
