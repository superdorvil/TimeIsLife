import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ChartNavBar,
  HoursChart,
  ProjectChartsDataPicker,
  HoursStatistics,
} from '_components';
import {Colors} from '_resources';
import projectDB from '_data';
import {HoursUtils, DateUtils} from '_utils';
import {States, Utils} from '_constants';

class ViewProjectCharts extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    const startDate = DateUtils.getSunday({
      date: currentDate,
    });
    // get 12 weeks from now on Saturday
    const endDate = DateUtils.getSaturday({
      date: DateUtils.futureDate({
        diff: 84, // 12 weeks
        date: currentDate,
      }),
    });

    const chartDataDescription = DateUtils.convertDateToString({
      date: {d1: startDate, d2: endDate},
      format: Utils.dateFormat.monDateYear_monDateYear,
    });

    this.state = {
      mode: States.weekly,
      chartDataDescription,
      totalHours: 0,
      averageDailyHours: 0,
      averageWeeklyHours: 0,
      averageMonthlyHours: 0,
      averageSundayHours: 0,
      averageMondayHours: 0,
      averageTuesdayHours: 0,
      averageWednesdayHours: 0,
      averageThursdayHours: 0,
      averageFridayHours: 0,
      averageSaturdayHours: 0,
      dailyDataIndex: DateUtils.getFirstDayOfMonth({date: currentDate}), // inc by first day of next month
      weeklyDataIndex: currentDate, // inc by 12, every 12 weeks
      monthlyDataIndex: DateUtils.getFirstMonthOfYearIndex({date: currentDate}), // inc by 12 // every year
    };

    this.incrementChartIndex = this.incrementChartIndex.bind(this);
    this.decrementChartIndex = this.decrementChartIndex.bind(this);
    this.chartNavBarPressed = this.chartNavBarPressed.bind(this);
  }

  componentDidMount() {
    this.initializeStatistics();
  }

  incrementChartIndex() {
    switch (this.state.mode) {
      case States.daily:
        this.setState({
          dailyDataIndex: DateUtils.getFirstDayOfNextMonth({
            date: this.state.dailyDataIndex,
          }),
        });
        break;
      case States.weekly:
        this.setState({
          weeklyDataIndex: DateUtils.futureDate({
            diff: 84, // 12 weeks
            date: this.state.weeklyDataIndex,
          }),
        });
        break;
      case States.monthly:
        this.setState({monthlyDataIndex: this.state.monthlyDataIndex + 12});
        break;
      default:
      // FIXME:: add error checking
    }
  }

  decrementChartIndex() {
    switch (this.state.mode) {
      case States.daily:
        this.setState({
          dailyDataIndex: DateUtils.getFirstDayOfPreviousMonth({
            date: this.state.dailyDataIndex,
          }),
        });
        break;
      case States.weekly:
        this.setState({
          weeklyDataIndex: DateUtils.futureDate({
            diff: -84, // 12 weeks
            date: this.state.weeklyDataIndex,
          }),
        });
        break;
      case States.monthly:
        this.setState({monthlyDataIndex: this.state.monthlyDataIndex - 12});
        break;
      default:
      // FIXME:: add error checking
    }
  }

  chartNavBarPressed(navButton) {
    switch (navButton) {
      case States.daily:
        this.setState({
          mode: States.daily,
          chartDataDescription: DateUtils.convertDateToString({
            date: this.state.dailyDataIndex,
            format: Utils.dateFormat.monthYear,
          }),
        });
        break;
      case States.weekly:
        const startDate = DateUtils.getSunday({
          date: this.state.weeklyDataIndex,
        });
        // get 12 weeks from now on Saturday
        const endDate = DateUtils.getSaturday({
          date: DateUtils.futureDate({
            diff: 84, // 12 weeks
            date: this.state.weeklyDataIndex,
          }),
        });
        this.setState({
          mode: States.weekly,
          chartDataDescription: DateUtils.convertDateToString({
            date: {d1: startDate, d2: endDate},
            format: Utils.dateFormat.monDateYear_monDateYear,
          }),
        });
        break;
      case States.monthly:
        this.setState({
          mode: States.monthly,
          // 1994 because the year index uses my year structure
          chartDataDescription: this.state.monthlyDataIndex + 1994,
        });
        break;
      default:
      // FIXME:: add error checking
    }
  }

  initializeStatistics() {
    let totalHours = 0;
    let averageDailyHours = 0;
    let averageWeeklyHours = 0;
    let averageMonthlyHours = 0;
    let averageSundayHours = 0;
    let averageMondayHours = 0;
    let averageTuesdayHours = 0;
    let averageWednesdayHours = 0;
    let averageThursdayHours = 0;
    let averageFridayHours = 0;
    let averageSaturdayHours = 0;

    const secondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      returnList: true,
    });

    if (secondsWorked.length > 0) {
      const initialSecondsWorked = secondsWorked[0];
      const today = new Date();
      const currentDateIndex = DateUtils.getDateIndex({date: today});
      const currentWeekIndex = DateUtils.getWeekIndex({date: today});
      const currentMonthIndex = DateUtils.getMonthIndex({date: today});
      const daysUsingApp = initialSecondsWorked.dateIndex - currentDateIndex;
      const weeksUsingApp = initialSecondsWorked.weekIndex - currentWeekIndex;
      const monthsUsingApp =
        initialSecondsWorked.monthIndex - currentMonthIndex;

      totalHours = HoursUtils.convertSecondsToHrs({
        totalSeconds: projectDB.getSecondsWorked({realm: this.props.realm}),
        decimalMinutes: true,
      });

      averageDailyHours = daysUsingApp > 0 ? totalHours / daysUsingApp : 0;
      averageWeeklyHours = weeksUsingApp > 0 ? totalHours / weeksUsingApp : 0;
      averageMonthlyHours =
        monthsUsingApp > 0 ? totalHours / monthsUsingApp : 0;

      secondsWorked.forEach((sw, i) => {
        switch (sw.startTime.getDay()) {
          case 0:
            averageSundayHours =
              averageSundayHours + (sw.endTime - sw.startTime);
            break;
          case 1:
            averageMondayHours =
              averageMondayHours + (sw.endTime - sw.startTime);
            break;
          case 2:
            averageTuesdayHours =
              averageTuesdayHours + (sw.endTime - sw.startTime);
            break;
          case 3:
            averageWednesdayHours =
              averageWednesdayHours + (sw.endTime - sw.startTime);
            break;
          case 4:
            averageThursdayHours =
              averageThursdayHours + (sw.endTime - sw.startTime);
            break;
          case 5:
            averageSaturdayHours =
              averageSaturdayHours + (sw.endTime - sw.startTime);
            break;
          case 6:
            averageFridayHours =
              averageFridayHours + (sw.endTime - sw.startTime);
            break;
          default:
          // add error checking
        }
      });

      averageSundayHours =
        weeksUsingApp > 0 ? averageSundayHours / 1000 / weeksUsingApp : 0;
      averageSundayHours =
        weeksUsingApp > 0 ? averageSundayHours / 1000 / weeksUsingApp : 0;
      averageSundayHours =
        weeksUsingApp > 0 ? averageSundayHours / 1000 / weeksUsingApp : 0;
      averageSundayHours =
        weeksUsingApp > 0 ? averageSundayHours / 1000 / weeksUsingApp : 0;
      averageSundayHours =
        weeksUsingApp > 0 ? averageSundayHours / 1000 / weeksUsingApp : 0;
      averageSundayHours =
        weeksUsingApp > 0 ? averageSundayHours / 1000 / weeksUsingApp : 0;
      averageSundayHours =
        weeksUsingApp > 0 ? averageSundayHours / 1000 / weeksUsingApp : 0;
    }

    this.setState({
      totalHours,
      averageDailyHours,
      averageWeeklyHours,
      averageMonthlyHours,
      averageSundayHours,
      averageMondayHours,
      averageTuesdayHours,
      averageWednesdayHours,
      averageThursdayHours,
      averageFridayHours,
      averageSaturdayHours,
    });
  }

  getLabels() {
    switch (this.state.mode) {
      case States.daily:
        return this.getDailyLabels();
      case States.weekly:
        return this.getWeeklyLabels();
      case States.monthly:
        return this.getMonthlyLabels();
      default:
      // FIXME:: add error checking
    }
  }

  getHours() {
    switch (this.state.mode) {
      case States.daily:
        return this.getDailyHours();
      case States.weekly:
        return this.getWeeklyHours();
      case States.monthly:
        return this.getMonthlyHours();
      default:
      // FIXME:: add error checking
    }
  }

  getDailyLabels() {
    return [];
  }

  getWeeklyLabels() {
    return [
      'w1',
      'w2',
      'w3',
      'w4',
      'w5',
      'w6',
      'w7',
      'w8',
      'w9',
      'w10',
      'w11',
      'w12',
    ];
  }

  getMonthlyLabels() {
    return [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
  }

  getDailyHours() {
    const dailyHours = [];
    const firstDayOfMonthIndex = DateUtils.getDateIndex({
      date: this.state.dailyDataIndex,
    });
    const lastDayOfMonthIndex = DateUtils.getDateIndex({
      date: DateUtils.getLastDayOfMonth({date: this.state.dailyDataIndex}),
    });

    for (let i = firstDayOfMonthIndex; i < lastDayOfMonthIndex + 1; i++) {
      dailyHours.push(
        projectDB.getSecondsWorked({
          realm: this.props.realm,
          dateIndex: i,
        }),
      );
    }

    return dailyHours;
  }

  getWeeklyHours() {
    const weeklyHours = [];

    for (let i = 0; i < 12; i++) {
      weeklyHours.push(
        HoursUtils.convertSecondsToHrs({
          totalSeconds: projectDB.getSecondsWorked({
            realm: this.props.realm,
            weekIndex: DateUtils.getWeekIndex({
              date: DateUtils.futureDate({
                date: this.state.weeklyDataIndex,
                diff: i,
              }),
            }),
          }),
          decimalMinutes: true,
        }),
      );
    }

    return weeklyHours;
  }

  getMonthlyHours() {
    const monthlyHours = [];

    for (let i = 0; i < 12; i++) {
      monthlyHours.push(
        HoursUtils.convertSecondsToHrs({
          totalSeconds: projectDB.getSecondsWorked({
            realm: this.props.realm,
            monthlyIndex: this.state.monthlyDataIndex + i,
          }),
          decimalMinutes: true,
        }),
      );
    }

    return monthlyHours;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>All Project Hours</Text>
        <ChartNavBar
          dailySelected={this.state.mode === States.daily}
          dailyPressed={() => this.chartNavBarPressed(States.daily)}
          weeklySelected={this.state.mode === States.weekly}
          weeklyPressed={() => this.chartNavBarPressed(States.weekly)}
          monthlySelected={this.state.mode === States.monthly}
          monthlyPressed={() => this.chartNavBarPressed(States.monthly)}
        />
        <HoursChart
          labels={this.getLabels()}
          hours={this.getHours()}
          dataWidth={70}
          yAxisSuffix=" hrs"
        />
        <ProjectChartsDataPicker
          dateInfo={this.state.chartDataDescription + ' Hours'}
          incrementChartIndex={this.incrementChartIndex}
          decrementChartIndex={this.decrementChartIndex}
        />
        <HoursStatistics
          totalHours={this.state.totalHours}
          averageDailyHours={this.state.averageDailyHours}
          averageWeeklyHours={this.state.averageWeeklyHours}
          averageMonthlyHours={this.state.averageMonthlyHours}
          averageSundayHours={this.state.averageSundayHours}
          averageMondayHours={this.state.averageMondayHours}
          averageTuesdayHours={this.state.averageTuesdayHours}
          averageWednesdayHours={this.state.averageWednesdayHours}
          averageThursdayHours={this.state.averageThursdayHours}
          averageFridayHours={this.state.averageFridayHours}
          averageSaturdayHours={this.state.averageSaturdayHours}
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
