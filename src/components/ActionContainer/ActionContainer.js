import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '_resources';
// import {ViewVisibleWrapper} from '_components';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';

class ActionContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopContainer />
        <BottomContainer />
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
