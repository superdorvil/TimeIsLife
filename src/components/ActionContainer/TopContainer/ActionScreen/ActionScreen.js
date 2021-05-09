import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ViewVisibleWrapper, BackArrow} from '_components';
import CenterIcon from './CenterIcon';
import TopRightButton from './TopRightButton';
import {Colors} from '_resources';

const ActionScreen = ({
  backArrowActive,
  backArrowPressed,
  centerIconName,
  actionDescription,
  subDescription,
  subDescription2,
  editButtonActive,
  deleteButtonActive,
  topRightButtonPressed,
}) => {
  return (
    <View style={styles.container}>
      <ViewVisibleWrapper
        active={backArrowActive}
        style={styles.backArrowContainer}>
        <BackArrow backArrowPressed={backArrowPressed} />
      </ViewVisibleWrapper>
      <CenterIcon centerIconName={centerIconName} />
      <Text style={styles.actionDescription}>{actionDescription}</Text>
      <ViewVisibleWrapper
        active={subDescription || subDescription2}
        style={styles.subDescriptionContainer}>
        <Text style={styles.subDescription}>{subDescription}</Text>
        <Text style={styles.subDescription2}>{subDescription2}</Text>
      </ViewVisibleWrapper>
      <TopRightButton
        editButtonActive={editButtonActive}
        deleteButtonActive={deleteButtonActive}
        topRightButtonPressed={topRightButtonPressed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  actionDescription: {
    marginTop: 16,
    color: Colors.primary,
    fontSize: 24,
    textAlign: 'center',
  },
  subDescription: {
    color: Colors.tertiary,
    fontSize: 12,
  },
  subDescription2: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  subDescriptionContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  backArrowContainer: {
    alignSelf: 'baseline',
  },
});

export default ActionScreen;
