import {Schemas} from '_constants';

const SettingsSchema = {
  name: Schemas.settings,
  properties: {
    currentDayIndex: {type: 'int', default: 0},
  },
};

export default SettingsSchema;
