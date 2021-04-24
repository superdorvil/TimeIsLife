import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import CenterIcon from './CenterIcon';
import TopRightButton from './TopRightButton';
import BackArrow from './BackArrow';
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
  topRightPressed,
}) => {
  return (
    <View style={styles.container}>
      <TopRightButton
        editButtonActive={editButtonActive}
        deleteButtonActive={deleteButtonActive}
        topRightPressed={topRightPressed}
      />
      <ViewVisibleWrapper active={backArrowActive}>
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
});

export default ActionScreen;
