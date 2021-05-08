import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {ActionContainer} from '_components';
import {Button, ProjectInput} from '_components';

import {Icons} from '_constants';

class EditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: this.props.project.description,
    };

    this.editProject = this.editProject.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  editProject() {
    if (this.state.description !== '') {
      projectDB.editProject({
        realm: this.props.realm,
        projectID: this.props.project.id,
        description: this.state.description,
      });

      Actions.pop();
    }
  }

  updateDescription(description) {
    this.setState({description});
  }

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
          actionButtonActive={false}
          actionButtonPressed={false}
          listDataActive={false}
          listData={false}
          renderListItem={false}>
          <ProjectInput
            header="Project Name"
            value={this.state.description}
            onChangeText={this.updateDescription}
            placeholder="enter project name ..."
          />
        </ActionContainer>
        <View style={styles.button}>
          <Button description="Edit Project" buttonPressed={this.editProject} />
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
