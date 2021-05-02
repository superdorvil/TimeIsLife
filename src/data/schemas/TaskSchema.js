import {Schemas} from '_constants';

const TaskSchema = {
  primaryKey: 'id',
  name: Schemas.task,
  properties: {
    id: 'int',
    projectID: 'int',
    description: 'string',
    position: 'int',
    completed: {type: 'bool', default: false},
  },
};

export default TaskSchema;
