import {Schemas} from '_constants';

const WeeklyGoalSchema = {
  name: Schemas.weeklyGoal,
  properties: {
    weekIndex: 'int',
    weeklyGoalSeconds: 'int', // FIXME:: Change to hours???
    projectID: 'int',
  },
};

export default WeeklyGoalSchema;
