import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Colors} from '_resources';

const TimeInput = ({
  hours,
  minutes,
  updateHours,
  updateMinutes,
  amPressed,
  pmPressed,
  ampm,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.typeInTime}>Type in time</Text>
      <View style={styles.innerContainer}>
        <View style={styles.timeInputContainer}>
          <View style={styles.timeInputInnerContainer}>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              multiline
              value={hours.toString()}
              autoCorrect={false}
              onChangeText={updateHours}
              placeholder="0"
            />
            <Text style={styles.time}>hours</Text>
          </View>
          <Text style={styles.colon}> : </Text>
          <View style={styles.timeInputInnerContainer}>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              multiline
              value={minutes.toString()}
              autoCorrect={false}
              onChangeText={updateMinutes}
              placeholder="0"
            />
            <Text style={styles.time}>minutes</Text>
          </View>
        </View>
        {/*<View style={styles.ampmContainer}>
          <View style={styles.ampmInnerContainer}>
            <TouchableOpacity
              style={styles.circleContainer}
              onPress={amPressed}>
              <View
                style={
                  ampm === 'am' ? styles.activeCircle : styles.inactiveCircle
                }
              />
            </TouchableOpacity>
            <Text style={styles.ampm}>PM</Text>
          </View>
          <View style={styles.ampmInnerContainer}>
            <TouchableOpacity
              style={styles.circleContainer}
              onPress={pmPressed}>
              <View
                style={
                  ampm === 'pm' ? styles.activeCircle : styles.inactiveCircle
                }
              />
            </TouchableOpacity>
            <Text style={styles.ampm}>AM</Text>
          </View>
        </View>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    flexDirection: 'row',
  },
  typeInTime: {
    color: Colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
    marginStart: 16,
    marginTop: 16,
  },
  colon: {
    color: Colors.secondary,
    fontSize: 24,
    alignSelf: 'center',
    marginStart: 6,
    marginEnd: 6,
  },
  input: {
    fontSize: 20,
    width: 40,
    paddingStart: 0,
    paddingBottom: 0,
    marginBottom: 0,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
  },
  timeInputContainer: {
    flexDirection: 'row',
    marginStart: 16,
    marginEnd: 16,
  },
  timeInputInnerContainer: {
    alignItems: 'flex-start',
  },
  ampm: {
    fontSize: 12,
    color: Colors.secondary,
  },
  ampmContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginEnd: 16,
    flexDirection: 'row',
  },
  ampmInnerContainer: {
    alignItems: 'center',
  },
  time: {
    color: Colors.secondary,
  },
  circleContainer: {
    borderWidth: 2,
    height: 32,
    width: 32,
    borderRadius: 30,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 8,
    marginEnd: 8,
  },
  activeCircle: {
    backgroundColor: Colors.primary,
    margin: 2,
    height: 20,
    width: 20,
    borderRadius: 20,
  },
});

export default TimeInput;
