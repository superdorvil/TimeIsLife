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
    yearIndex: 'int',
    startTime: 'date',
    endTime: 'date',
    deleted: {type: 'bool', default: false},
  },
};

export default SecondsWorkedSchema;
