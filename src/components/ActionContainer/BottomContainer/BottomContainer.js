import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Colors} from '_resources';
import {ViewVisibleWrapper, Divider} from '_components';
import ActionButton from './ActionButton';
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
        <View style={styles.curvedBorder} />
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
    padding: 16,
  },
  curvedBorder: {
    borderColor: Colors.primary,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    height: 16,
  },
  list: {
    flex: 1,
  },
  listPadding: {
    paddingBottom: 92,
  },
});

export default BottomContainer;
