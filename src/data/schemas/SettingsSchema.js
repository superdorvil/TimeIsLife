import {Schemas} from '_constants';

const SettingsSchema = {
  name: Schemas.settings,
  properties: {
    colorScheme: {type: 'int', default: 0},
    subTaskMode: {type: 'bool', default: false},
  },
};

export default SettingsSchema;
