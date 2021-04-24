import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '_resources';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';

class ActionContainer extends Component {
  backArrowPressed() {}

  render() {
    return (
      <View style={styles.container}>
        <TopContainer
          weeklyProgressActive={this.props.weeklyProgressActive}
          secondsWorked={this.props.weeklyProgressData.secondsWorked}
          secondsGoal={this.props.weeklyProgressData.secondsGoal}
          weekdaySeconds={this.props.weeklyProgressData.weekdaySeconds}
          backArrowActive={this.props.actionScreenData.backArrowActive}
          backArrowPressed={this.backArrowPressed}
          actionScreenActive={this.props.actionScreenActive}
          centerIconName={this.props.actionScreenData.centerIconName}
          actionDescription={this.props.actionScreenData.actionDescription}
          subDescription={this.props.actionScreenData.subDescription}
          subDescription2={this.props.actionScreenData.subDescription2}
          editButtonActive={this.props.actionScreenData.editButtonActive}
          deleteButtonActive={this.props.actionScreenData.deleteButtonActive}
        />
        <BottomContainer
          topChildActive={this.props.topChildActive}
          topChild={this.props.topChild}
          bottomChildActive={this.props.bottomChildActive}
          bottomChild={this.props.bottomChild}
          actionButtonActive={this.props.actionButtonActive}
          actionButtonPressed={this.props.actionButtonPressed}
          listData={this.props.listData}
          listDataActive={this.props.listDataActive}
          renderListItem={this.props.renderListItem}
          actionNavBarActive={this.props.actionNavBarActive}
          taskNavButtonActive={this.props.actionNavBarData.taskNavButtonActive}
          taskNavButtonPressed={
            this.props.actionNavBarData.taskNavButtonPressed
          }
          timerNavButtonActive={
            this.props.actionNavBarData.timerNavButtonActive
          }
          timerNavButtonPressed={
            this.props.actionNavBarData.timerNavButtonPressed
          }
          goalsNavButtonActive={
            this.props.actionNavBarData.goalsNavButtonActive
          }
          goalsNavButtonPressed={
            this.props.actionNavBarData.goalsNavButtonPressed
          }
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
