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
          weeklyProgressActive={this.props.weeklyProgressActive}
          progress={this.props.progress}
          secondsWorked={this.props.secondsWorked}
          secondsGoal={this.props.secondsGoal}
          weekdaySeconds={this.props.weekdaySeconds}
          backArrowPressed={this.props.backArrowPressed}
          centerIconName={this.props.centerIconName}
          actionDescription={this.props.actionDescription}
          subDescription={this.props.subDescription}
          subDescription2={this.props.subDescription2}
          editButtonActive={this.props.editButtonActive}
          topRightButtonActive={this.props.topRightButtonActive}
        />
        <BottomContainer
          topChild={this.props.topChild}
          actionButton={this.props.actionButton}
          listData={this.props.listData}
          renderListItem={this.props.renderListItem}
          bottomChild={this.props.bottomChild}
          navBarActive={this.props.navBarActive}
          taskActive={this.props.taskActive}
          taskNavButton={this.props.taskNavButton}
          timerActive={this.props.timerActive}
          timerNavButton={this.props.timerNavButton}
          goalsActive={this.props.goalsActive}
          goalsNavButton={this.props.goalsNavButton}
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
