import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Colors} from '_resources';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';

class ActionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.backArrowPressed = this.backArrowPressed.bind(this);
  }

  backArrowPressed() {
    Actions.pop();
  }

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
          topRightButtonPressed={
            this.props.actionScreenData.topRightButtonPressed
          }
        />
        <BottomContainer
          extraData={this.props.extraData}
          actionButtonActive={this.props.actionButtonActive}
          actionButtonPressed={this.props.actionButtonPressed}
          actionButtonDescription={this.props.actionButtonDescription}
          listData={this.props.listData}
          listDataActive={this.props.listDataActive}
          renderListItem={this.props.renderListItem}
          actionNavBarActive={this.props.actionNavBarActive}
          taskNavButtonSelected={
            this.props.actionNavBarData.taskNavButtonSelected
          }
          taskNavButtonPressed={
            this.props.actionNavBarData.taskNavButtonPressed
          }
          timerNavButtonSelected={
            this.props.actionNavBarData.timerNavButtonSelected
          }
          timerNavButtonPressed={
            this.props.actionNavBarData.timerNavButtonPressed
          }
          goalsNavButtonSelected={
            this.props.actionNavBarData.goalsNavButtonSelected
          }
          goalsNavButtonPressed={
            this.props.actionNavBarData.goalsNavButtonPressed
          }>
          {this.props.children}
        </BottomContainer>
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
