import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActionContainer} from '_components';
import {Button, ProjectInput} from '_components';
import {Icons} from '_constants';

class CreateTask extends Component {
  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: false,
      topRightButtonActive: false,
      centerIconName: Icons.checkmark,
      actionDescription: 'Create New Task',
      subDescription: 'Time is Life',
    };

    return (
      <View style={styles.container}>
        <ActionContainer
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={false}
          actionButtonActive={false}
          actionButtonPressed={false}
          listDataActive={false}
          listData={false}
          renderListItem={false}>
          <ProjectInput
            header="Task Name"
            //value={false}
            //onChangeText={false}
            placeholder="enter task name ..."
          />
        </ActionContainer>
        <View style={styles.button}>
          <Button description="+ Add Task" buttonPressed={false} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    left: 16,
    bottom: 32,
  },
});

export default CreateTask;
