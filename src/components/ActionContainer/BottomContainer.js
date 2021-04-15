import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Colors} from '_resources';
import {ViewVisibleWrapper, Divider} from '_components';
import ActionButton from './ActionButton';
//active, style, children, onPress

//Props List
//topChild
//topChildActive
//actionButton
//actionButtonActive
//listData
//listActive
//renderListItem
//bottomChild
//bottomChildActive

class BottomContainer extends Component {
  renderDivider() {
    return <Divider />;
  }

  render() {
    return (
      <View style={styles.container}>
        <ViewVisibleWrapper active={this.props.topChildActive}>
          {this.props.topChild}
        </ViewVisibleWrapper>
        <ViewVisibleWrapper active={this.props.actionButtonActive}>
          <ActionButton />
        </ViewVisibleWrapper>
        <ViewVisibleWrapper active={this.props.listActive} style={styles.list}>
          <FlatList
            data={this.props.listData}
            renderItem={({item}) => this.props.renderListItem(item)}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this.renderDivider}
            ItemSeparatorComponent={this.renderDivider}
            contentContainerStyle={styles.listPadding}
          />
        </ViewVisibleWrapper>
        <ViewVisibleWrapper active={this.props.bottomChildActive}>
          {this.props.bottomChild}
        </ViewVisibleWrapper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  list: {
    flex: 1,
  },
  listPadding: {
    paddingBottom: 92,
  },
});

export default BottomContainer;
