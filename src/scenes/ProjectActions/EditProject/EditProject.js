import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActionContainer} from '_components';
import {Button, ProjectInput} from '_components';
import {Icons} from '_constants';

class EditProject extends Component {
  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: false,
      deleteButtonActive: true,
      centerIconName: Icons.checkmark,
      actionDescription: 'Edit Project',
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
          topChildActive={true}
          topChild={
            <ProjectInput
              header="Project Name"
              //value={false}
              //onChangeText={false}
              placeholder="enter project name ..."
            />
          }
          actionButtonActive={false}
          actionButtonPressed={false}
          listDataActive={false}
          listData={false}
          renderListItem={false}
        />
        <View style={styles.button}>
          <Button description="Edit Project" buttonPressed={false} />
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

export default EditProject;
