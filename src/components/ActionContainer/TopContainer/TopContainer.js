import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import WeeklyProgress from './WeeklyProgress';
//active, style, children, onPress

//weeklyProgressActive
//progress
//secondsWorked
//goalSeconds
//weekdaySeconds

class TopContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ViewVisibleWrapper active={this.props.weeklyProgressActive}>
          <WeeklyProgress
            progress={this.props.progress}
            goalSeconds={this.props.goalSeconds}
            secondsWorked={this.props.secondsWorked}
            weekdaySeconds={this.props.weekdaySeconds}
          />
        </ViewVisibleWrapper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

export default TopContainer;
