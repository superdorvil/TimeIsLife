import {Schemas} from '_constants';

const WeeklyGoalSchema = {
  name: Schemas.weeklyGoal,
  properties: {
    weekIndex: 'int',
    weeklyGoalSeconds: 'int',
    projectID: 'int',
  },
};

export default WeeklyGoalSchema;
