import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '_resources';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';

class ActionContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopContainer
          weeklyProgressActive
          progress={0.1}
          secondsWorked={1}
          goalSeconds={1}
          weekdaySeconds={[
            {weekday: 5, secondsWorked: 3},
            {weekday: 3, secondsWorked: 3},
            {weekday: 2, secondsWorked: 3},
            {weekday: 6, secondsWorked: 3},
            {weekday: 4, secondsWorked: 3},
            {weekday: 3, secondsWorked: 3},
            {weekday: 3, secondsWorked: 3},
          ]}
        />
        <BottomContainer
          topChild
          actionButton
          listData={[]}
          renderListItem
          bottomChild
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
});

export default ActionContainer;
