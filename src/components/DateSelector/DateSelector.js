import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {ConfirmationButtons} from '_components';
import {Colors} from '_resources';

const DateSelector = ({
  visible,
  date,
  changeDate,
  confirmDateChange,
  closeModal,
}) => {
  const year = '2021';
  const formattedDate = 'Sun, Apr 25';

  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      backdropColor={Colors.black}
      backdropOpacity={0.5}
      onBackdropPress={closeModal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.year}>{year}</Text>
          <Text style={styles.formattedDate}>{formattedDate}</Text>
        </View>
        <Calendar
          //current={new Date()}
          //minDate={new Date()}
          //maxDate={new Date()}
          hideExtraDays
          onDayPress={day => {
            changeDate(day);
          }}
          monthFormat={'MMMM yyyy'}
          // renderArrow={(direction) => (<Arrow/>)}
          style={styles.calendarStyle}
          markedDates={{
            [date]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: Colors.primary,
            },
          }}
          theme={{
            backgroundColor: Colors.tertiary,
            calendarBackground: Colors.tertiary,
            textSectionTitleColor: Colors.secondary, // Sun-Sat
            //textSectionTitleDisabledColor: Colors.secondary,
            //selectedDayBackgroundColor: 'red',
            //selectedDayTextColor: 'green',
            todayTextColor: Colors.secondary,
            dayTextColor: Colors.secondary,
            //textDisabledColor: '#d9e1e8',
            //dotColor: 'red',
            //selectedDotColor: 'red',
            arrowColor: Colors.secondary,
            //disabledArrowColor: '#d9e1e8',
            monthTextColor: Colors.secondary,
            //indicatorColor: 'red',
            //textDayFontFamily: 'monospace',
            //textMonthFontFamily: 'monospace',
            //textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
        <ConfirmationButtons
          okayPressed={confirmDateChange}
          cancelPressed={closeModal}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  calendarStyle: {
    height: 425,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
  },
  year: {
    fontSize: 20,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  formattedDate: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
  },
});

export default DateSelector;
