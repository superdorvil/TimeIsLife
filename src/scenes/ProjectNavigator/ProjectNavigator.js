import React, {Component} from 'react';
import {View} from 'react-native';
import {TabBar} from '_components';
import {Icons} from '_constants';
import SceneSelector from './SceneSelector';

class ProjectNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationState: Icons.projects,
    };

    this.tabBarPressed = this.tabBarPressed.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  tabBarPressed(navigationState) {
    this.setState({navigationState: navigationState});
  }

  render() {
    return (
      <View style={containerStyle()}>
        <SceneSelector
          scene={this.state.navigationState}
          realm={this.props.realm}
        />
        <TabBar
          navigationState={this.state.navigationState}
          projectsPressed={() => this.tabBarPressed(Icons.projects)}
          goalsPressed={() => this.tabBarPressed(Icons.goals)}
          chartsPressed={() => this.tabBarPressed(Icons.charts)}
          settingsPressed={() => this.tabBarPressed(Icons.settings)}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectNavigator;
