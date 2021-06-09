import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';
import Modal from 'react-native-modal';
import {ConfirmationButtons, Divider} from '_components';
//import {Colors} from '_resources';
import SubTask from './SubTask';
import projectDB from '_data';

class SelectSubTaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.confirmSubTaskChange = this.confirmSubTaskChange.bind(this);
  }

  confirmSubTaskChange() {
    this.props.closeModal();
  }

  renderSubTask() {
    return <SubTask subTask="test" selected={false} /*subTaskPressed={}*/ />;
  }

  renderDivider() {
    return <Divider />;
  }

  render() {
    return (
      <Modal
        animationType="slide"
        isVisible={this.props.visible}
        backdropColor="#000000"
        backdropOpacity={0.5}
        onBackdropPress={this.props.closeModal}>
        <View style={containerStyle()}>
          <Text>Select SubTask</Text>
          <FlatList
            data={this.props.listData}
            renderItem={({item}) =>
              this.props.renderListItem(item, this.props.extraData)
            }
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this.renderDivider}
            ItemSeparatorComponent={this.renderDivider}
            contentContainerStyle={listPaddingStyle()}
          />
          <ConfirmationButtons
            okayPressed={this.confirmSubTaskChange}
            cancelPressed={this.props.closeModal}
          />
        </View>
      </Modal>
    );
  }
}

const containerStyle = () => {
  return {};
};

const listPaddingStyle = () => {
  return {paddingBottom: 16};
};

export default SelectSubTaskModal;
