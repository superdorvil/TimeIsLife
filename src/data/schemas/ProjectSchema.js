import {Schemas} from '_constants';

const ProjectSchema = {
  primaryKey: 'id',
  name: Schemas.project,
  properties: {
    id: 'int',
    description: 'string',
    position: 'int',
    deleted: {type: 'bool', default: false},
    timerActive: {type: 'bool', default: false},
    timerStartTime: 'date?',
  },
};

export default ProjectSchema;
