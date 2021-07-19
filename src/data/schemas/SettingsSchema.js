import {Schemas} from '_constants';
import {Colors} from '_resources';

const SettingsSchema = {
  name: Schemas.settings,
  properties: {
    colorScheme: {type: 'int', default: Colors.orangeLight},
    subTaskMode: {type: 'bool', default: false},
  },
};

export default SettingsSchema;
