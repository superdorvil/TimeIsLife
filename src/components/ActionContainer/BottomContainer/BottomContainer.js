import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {Colors} from '_resources';
import {ViewVisibleWrapper, Divider} from '_components';
import ActionButton from './ActionButton';

class BottomContainer extends Component {
  renderDivider() {
    return <Divider />;
  }

  render() {
    return (
      <View style={containerStyle()}>
        {this.props.children ? (
          <View style={childrenContainerStyle()}>{this.props.children}</View>
        ) : (
          <View style={innerContainerStyle()}>
            <ViewVisibleWrapper active={this.props.actionButtonActive}>
              <ActionButton
                actionButtonDescription={this.props.actionButtonDescription}
                actionButtonPressed={this.props.actionButtonPressed}
              />
            </ViewVisibleWrapper>
            <ViewVisibleWrapper
              active={this.props.listDataActive}
              style={listStyle()}>
              <FlatList
                data={this.props.listData}
                renderItem={({item}) =>
                  this.props.renderListItem(item, this.props.extraData)
                }
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                  this.props.actionButtonActive &&
                  this.props.listData.length > 0 ? (
                    this.renderDivider
                  ) : (
                    <View />
                  )
                }
                ItemSeparatorComponent={this.renderDivider}
                contentContainerStyle={listPaddingStyle()}
              />
            </ViewVisibleWrapper>
          </View>
        )}
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primary[global.colorScheme],
  };
};

const innerContainerStyle = () => {
  return {
    flex: 1,
    paddingTop: 12,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 16,
  };
};

const childrenContainerStyle = () => {
  return {
    flex: 1,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 16,
  };
};

const listStyle = () => {
  return {flex: 1};
};

const listPaddingStyle = () => {
  return {paddingBottom: 16};
};

export default BottomContainer;
