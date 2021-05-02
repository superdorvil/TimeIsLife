import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Colors} from '_resources';
import {ViewVisibleWrapper, Divider} from '_components';
import ActionButton from './ActionButton';
import ActionNavBar from './ActionNavBar';

class BottomContainer extends Component {
  renderDivider() {
    return <Divider />;
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionNavBar
          actionNavBarActive={this.props.actionNavBarActive}
          taskNavButtonSelected={this.props.taskNavButtonSelected}
          taskNavButtonPressed={this.props.taskNavButtonPressed}
          timerNavButtonSelected={this.props.timerNavButtonSelected}
          timerNavButtonPressed={this.props.timerNavButtonPressed}
          goalsNavButtonSelected={this.props.goalsNavButtonSelected}
          goalsNavButtonPressed={this.props.goalsNavButtonPressed}
        />
        {this.props.children ? (
          <View style={styles.childrenContainer}>{this.props.children}</View>
        ) : (
          <View style={styles.innerContainer}>
            <ViewVisibleWrapper active={this.props.actionButtonActive}>
              <ActionButton
                actionButtonDescription={this.props.actionButtonDescription}
                actionButtonPressed={this.props.actionButtonPressed}
              />
            </ViewVisibleWrapper>
            <ViewVisibleWrapper
              active={this.props.listDataActive}
              style={styles.list}>
              <FlatList
                data={this.props.listData}
                renderItem={({item}) =>
                  this.props.renderListItem(item, this.props.extraData)
                }
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                  this.props.actionButtonActive ? this.renderDivider : <View />
                }
                ItemSeparatorComponent={this.renderDivider}
                contentContainerStyle={styles.listPadding}
              />
            </ViewVisibleWrapper>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.primary,
    borderBottomWidth: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 12,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 16,
  },
  childrenContainer: {
    flex: 1,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 16,
  },
  list: {
    flex: 1,
  },
  listPadding: {
    paddingBottom: 16,
  },
  bottomChild: {},
});

export default BottomContainer;
