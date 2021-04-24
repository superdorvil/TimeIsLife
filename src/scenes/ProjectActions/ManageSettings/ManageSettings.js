import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SettingsItem} from '_components';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

class ManageSettings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsText}>Settings</Text>
          <View style={styles.settingsIconContainer}>
            <Icon name={Icons.settings} size={32} style={styles.settings} />
          </View>
        </View>
        <SettingsItem description="Notifications" settingsPressed />
        <SettingsItem description="About" settingsPressed />
        <SettingsItem description="Help / Tutorial" settingsPressed />
        <SettingsItem description="Rate App" settingsPressed />
        <SettingsItem description="Share with friends" settingsPressed />
        <SettingsItem description="Contact Us" settingsPressed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  settings: {
    color: Colors.primary,
  },
  settingsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    padding: 16,
  },
  settingsIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  settingsText: {
    fontSize: 32,
    color: Colors.primary,
  },
});

export default ManageSettings;
