import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ChartNavBar,
  HoursChart,
  ChartDateInfoSelector,
  HoursStatistics,
} from '_components';
import {Colors} from '_resources';

class ViewProjectCharts extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>All Project Hours</Text>
        <ChartNavBar
          dailySelected={false}
          dailyPressed
          weeklySelected={true}
          weeklyPressed
          monthlySelected={false}
          monthlyPressed
        />
        <HoursChart
          labels={['1st', '5th', '10th', '15th', '20th', '25th']}
          hours={[35, 25, 16, 18, 15, 43, 32, 37, 8, 19, 28, 20, 12]}
          dataWidth={5}
          yAxisSuffix=" hrs"
        />
        <ChartDateInfoSelector
          dateInfo="January 2020"
          leftArrowPressed
          rightArrowPressed
        />
        <HoursStatistics
          totalHours={1936}
          averageDailyHours={8}
          averageWeeklyHours={56}
          averageMonthlyHours={250}
          averageSundayHours={5}
          averageMondayHours={9}
          averageTuesdayHours={3}
          averageWednesdayHours={4}
          averageThursdayHours={12}
          averageFridayHours={3}
          averageSaturdayHours={9}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingTop: 16,
    paddingBottom: 16,
    borderColor: Colors.primary,
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 24,
    color: Colors.tertiary,
    alignSelf: 'center',
  },
});

export default ViewProjectCharts;
