import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChartNavButton from './ChartNavButton';
import {Colors} from '_resources';

const ChartNavBar = ({
  dailySelected,
  dailyPressed,
  weeklySelected,
  weeklyPressed,
  monthlySelected,
  monthlyPressed,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <ChartNavButton
          description="Daily"
          selected={dailySelected}
          navButtonPressed={dailyPressed}
        />
        <ChartNavButton
          description="Weekly"
          selected={weeklySelected}
          navButtonPressed={weeklyPressed}
        />
        <ChartNavButton
          description="Monthly"
          selected={monthlySelected}
          navButtonPressed={monthlyPressed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  outerContainer: {
    marginTop: 8,
    marginBottom: 8,
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStartWidth: 0,
    borderEndWidth: 0,
    borderColor: Colors.primary,
  },
});

export default ChartNavBar;
