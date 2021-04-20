import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class ViewProjectCharts extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>View Project Charts</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ViewProjectCharts;
