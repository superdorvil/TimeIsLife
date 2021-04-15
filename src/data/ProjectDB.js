import {DateUtils, MessageUtils} from '_utils';
import {Schemas, States} from '_constants';
import * as ProjectMigrations from './ProjectMigrations';

class ProjectDB {
  runMigrations({oldRealm, newRealm}) {
    if (oldRealm.schemaVersion < 1) {
      // ProjectMigrations.realmUpdate1({oldRealm, newRealm});
    }
  }

  initSettings({realm}) {
    /*
    const dateIndex = DateUtils.getDailyIndex({date: new Date()});
    let settings;

    if (realm.objects(Schemas.settings).length < 1) {
      realm.write(() => {
        settings = realm.create(Schemas.settings, {
          currentDateIndex: dateIndex,
        });
      });
    } else {
      settings = realm.objects(Schemas.settings)[0];

      realm.write(() => {
        if (dateIndex !== settings.currentDateIndex) {
          settings.currentDateIndex = dateIndex;
        }
      });
    }

    return settings;
    */
  }
}

const projectDB = new ProjectDB();

export default projectDB;
