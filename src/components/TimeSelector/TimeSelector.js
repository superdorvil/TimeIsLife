import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {ConfirmationButtons} from '_components';
import TimeInput from './TimeInput';
import {Icons} from '_constants';
import {Icon} from '_components';
import {Colors} from '_resources';

const TimeSelector = ({
  visible,
  closeModal,
  setTimeDescription,
  hours,
  minutes,
  updateHours,
  updateMinutes,
  amPressed,
  pmPressed,
  ampm,
  okayPressed,
  cancelPressed,
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      backdropColor={Colors.black}
      backdropOpacity={0.5}
      onBackdropPress={cancelPressed}>
      <View style={styles.container}>
        <View>
          <Text style={styles.setTimeDescription}>{setTimeDescription}</Text>
          <TimeInput
            hours={hours}
            minutes={minutes}
            updateHours={updateHours}
            updateMinutes={updateMinutes}
            amPressed={amPressed}
            pmPressed={pmPressed}
            ampm={ampm}
          />
        </View>
        <ConfirmationButtons
          okayPressed={okayPressed}
          cancelPressed={cancelPressed}
        />
        <Icon name={Icons.clock} size={24} style={styles.clock} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    width: '75%',
    alignSelf: 'center',
    backgroundColor: Colors.tertiary,
    paddingBottom: 70,
  },
  setTimeDescription: {
    color: Colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  clock: {
    color: Colors.primary,
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
});

export default TimeSelector;
