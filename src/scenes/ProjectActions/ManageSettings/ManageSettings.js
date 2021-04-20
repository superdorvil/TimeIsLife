import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class ManageSettings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Manage Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManageSettings;
