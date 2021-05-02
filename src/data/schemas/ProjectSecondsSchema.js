import {Schemas} from '_constants';

const ProjectSecondsSchema = {
  primaryKey: 'id',
  name: Schemas.projectSeconds,
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

export default ProjectSecondsSchema;
