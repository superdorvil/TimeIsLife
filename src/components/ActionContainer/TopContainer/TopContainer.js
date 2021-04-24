import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import WeeklyProgress from './WeeklyProgress';
import ActionScreen from './ActionScreen';

const TopContainer = ({
  weeklyProgressActive,
  secondsGoal,
  secondsWorked,
  weekdaySeconds,
  backArrowActive,
  actionScreenActive,
  centerIconName,
  actionDescription,
  subDescription,
  subDescription2,
  editButtonActive,
  deleteButtonActive,
}) => {
  return (
    <View style={styles.container}>
      <ViewVisibleWrapper active={weeklyProgressActive}>
        <WeeklyProgress
          secondsGoal={secondsGoal}
          secondsWorked={secondsWorked}
          weekdaySeconds={weekdaySeconds}
          weeklyHoursFontSizeBig={true}
        />
      </ViewVisibleWrapper>
      <ViewVisibleWrapper active={actionScreenActive}>
        <ActionScreen
          backArrowActive={backArrowActive}
          centerIconName={centerIconName}
          actionDescription={actionDescription}
          subDescription={subDescription}
          subDescription2={subDescription2}
          editButtonActive={editButtonActive}
          deleteButtonActive={deleteButtonActive}
        />
      </ViewVisibleWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginStart: 16,
    marginEnd: 16,
  },
});

export default TopContainer;
