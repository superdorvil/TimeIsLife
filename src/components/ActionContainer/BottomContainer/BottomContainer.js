import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Colors} from '_resources';
import {ViewVisibleWrapper, Divider} from '_components';
import ActionButton from './ActionButton';
import ActionNavBar from './ActionNavBar';
//active, style, children, onPress

//topChild
//actionButton
//listData
//renderListItem
//bottomChild

class BottomContainer extends Component {
  renderDivider() {
    return <Divider />;
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionNavBar
          navBarActive={this.props.navBarActive}
          taskActive={this.props.taskActive}
          taskNavButton={this.props.taskNavButton}
          timerActive={this.props.timerActive}
          timerNavButton={this.props.timerNavButton}
          goalsActive={this.props.goalsActive}
          goalsNavButton={this.props.goalsNavButton}
        />
        <View style={styles.innerContainer}>
          <ViewVisibleWrapper active={this.props.topChild}>
            {this.props.topChild}
          </ViewVisibleWrapper>
          <ViewVisibleWrapper active={this.props.actionButton}>
            <ActionButton />
          </ViewVisibleWrapper>
          <ViewVisibleWrapper active={this.props.listData} style={styles.list}>
            <FlatList
              data={this.props.listData}
              renderItem={({item}) => this.props.renderListItem(item)}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={this.renderDivider}
              ItemSeparatorComponent={this.renderDivider}
              contentContainerStyle={styles.listPadding}
            />
          </ViewVisibleWrapper>
          <ViewVisibleWrapper active={this.props.bottomChild}>
            {this.props.bottomChild}
          </ViewVisibleWrapper>
        </View>
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
    paddingTop: 12,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 16,
  },
  list: {
    flex: 1,
  },
  listPadding: {
    paddingBottom: 92,
  },
});

export default BottomContainer;
