import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {ConfirmationButtons, ViewVisibleWrapper} from '_components';
import {Icon} from '_components';
import {Colors} from '_resources';

const ConfirmationModal = ({
  visible,
  closeModal,
  header,
  description,
  iconName,
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
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.description}>{description}</Text>
        <ConfirmationButtons
          okayPressed={okayPressed}
          cancelPressed={cancelPressed}
        />
        <ViewVisibleWrapper visible={iconName}>
          <Icon name={iconName} size={24} style={styles.icon} />
        </ViewVisibleWrapper>
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
  header: {
    color: Colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  description: {
    color: Colors.secondary,
    fontSize: 20,
    marginStart: 16,
    marginEnd: 16,
    marginTop: 16,
  },
  icon: {
    color: Colors.primary,
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
});

export default ConfirmationModal;
