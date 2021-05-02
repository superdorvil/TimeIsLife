import {Schemas} from '_constants';

const SecondsWorkedSchema = {
  primaryKey: 'id',
  name: Schemas.secondsWorked,
  properties: {
    id: 'int',
    taskID: 'int?',
    projectID: 'int',
    dateIndex: 'int',
    weekIndex: 'int',
    monthIndex: 'int',
    startTime: 'date',
    endTime: 'date',
  },
};

export default SecondsWorkedSchema;
