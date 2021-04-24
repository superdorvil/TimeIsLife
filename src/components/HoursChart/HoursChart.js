import React from 'react';
import {View, ScrollView, Text, StyleSheet, Dimensions} from 'react-native';
import {Colors} from '_resources';
import {LineChart} from 'react-native-chart-kit';

const HoursChart = ({labels, hours, dataWidth, yAxisSuffix}) => {
  let datasets;
  const screenWidth = Dimensions.get('window').width;
  let width = hours.length * dataWidth;

  if (width < screenWidth) {
    width = screenWidth;
  }

  if (hours.length === 0) {
    datasets = [{data: [0]}];
  } else {
    datasets = [{data: hours}];
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <LineChart
          data={{labels, datasets}}
          width={width} // from react-native
          height={180}
          yAxisSuffix={yAxisSuffix}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: Colors.secondary,
            backgroundGradientFrom: Colors.secondary,
            backgroundGradientTo: Colors.secondary,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: Colors.primary,
            },
          }}
          style={styles.chart}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  chart: {},
  dataType: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.white,
    backgroundColor: Colors.secondary,
  },
});

export default HoursChart;
