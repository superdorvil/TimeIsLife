import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import CenterIcon from './CenterIcon';
import TopRightButton from './TopRightButton';
import BackArrow from './BackArrow';
import {Colors} from '_resources';

const ActionScreen = ({
  backArrowPressed,
  centerIconName,
  actionDescription,
  subDescription,
  subDescription2,
  editButtonActive,
  topRightPressed,
  topRightButtonActive,
}) => {
  return (
    <View style={styles.container}>
      <TopRightButton
        topRightButtonActive={topRightButtonActive}
        editButtonActive={editButtonActive}
        topRightPressed={topRightPressed}
      />
      <BackArrow backArrowPressed={backArrowPressed} />
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
    paddingBottom: 16,
  },
});

export default ActionScreen;
