import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SettingsItem} from '_components';
import {Icon, ColorSchemeModal} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';
import projectDB from '_data';

class ManageSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorSchemeModalVisible: false,
      settings: projectDB.getSettings({realm: this.props.realm}),
    };

    this.openColorSchemeModal = this.openColorSchemeModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateColorScheme = this.updateColorScheme.bind(this);
  }

  componentDidMount() {
    this.state.settings.addListener(() => {
      this.setState({
        settings: projectDB.getSettings({realm: this.props.realm}),
      });
      global.colorScheme = this.state.settings.colorScheme;
    });
  }

  componentWillUnmount() {
    this.state.settings.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  openColorSchemeModal() {
    this.setState({colorSchemeModalVisible: true});
  }

  closeModal() {
    this.setState({colorSchemeModalVisible: false});
  }

  updateColorScheme(colorScheme) {
    projectDB.updateColorScheme({realm: this.props.realm, colorScheme});
  }

  render() {
    return (
      <View style={containerStyle()}>
        <View style={settingsContainerStyle()}>
          <Text style={settingsTextStyle()}>Settings</Text>
          <View style={settingsIconContainerStyle()}>
            <Icon name={Icons.settings} size={32} style={settingsStyle()} />
          </View>
        </View>
        <SettingsItem description="SubTask Mode" />
        <SettingsItem
          description="Color Scheme"
          settingsPressed={this.openColorSchemeModal}
        />
        <SettingsItem description="Notifications" />
        <SettingsItem description="About" />
        <SettingsItem description="Help / Tutorial" />
        <SettingsItem description="Rate App" />
        <SettingsItem description="Share with friends" />
        <SettingsItem description="Contact Us" />
        <ColorSchemeModal
          visible={this.state.colorSchemeModalVisible}
          orangeLightPressed={() => this.updateColorScheme(Colors.orangeLight)}
          orangeDarkPressed={() => this.updateColorScheme(Colors.orangeDark)}
          blueLightPressed={() => this.updateColorScheme(Colors.blueLight)}
          blueDarkPressed={() => this.updateColorScheme(Colors.blueDark)}
          cancelPressed={this.closeModal}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: Colors.secondary[global.colorScheme],
    borderColor: Colors.primary[global.colorScheme],
  };
};

const settingsContainerStyle = () => {
  return {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 16,
    borderColor: Colors.primary[global.colorScheme],
  };
};

const settingsStyle = () => {
  return {color: Colors.primary[global.colorScheme]};
};

const settingsTextStyle = () => {
  return {
    fontSize: 32,
    color: Colors.primary[global.colorScheme],
  };
};

const settingsIconContainerStyle = () => {
  return {
    flex: 1,
    alignItems: 'flex-end',
  };
};

export default ManageSettings;
