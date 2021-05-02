import {Schemas} from '_constants';
// import * as ProjectMigrations from './ProjectMigrations';

class ProjectDB {
  runMigrations({oldRealm, newRealm}) {
    /*if (oldRealm.schemaVersion < 1) {
      // ProjectMigrations.realmUpdate1({oldRealm, newRealm});
    }*/
  }

  initSettings({realm}) {
    if (realm.objects(Schemas.settings).length < 1) {
      realm.write(() => {
        realm.create(Schemas.settings, {});
      });
    }
  }

  sumProjectsSeconds({projectHours}) {}

  getTask() {}

  getProjects() {}

  getSecondsWorked({
    taskId,
    projectId,
    dateIndex,
    weekIndex,
    monthIndex,
    sortType,
    ascendingSort,
    returnList,
  }) {}

  getCurrentWeeksDailySecondsWorked() {}

  getWeeklyGoalSeconds({weekIndex, projectID}) {}

  createRealmObject({objectData}) {}

  // id prexisiting objects id + 1
  // sort order to the top
  createProject({projectID, description}) {}

  // id prexisiting objects id + 1
  // sort order to the top
  createTask({taskID, projectID, description}) {}

  // id prexisiting objects id + 1
  createProjectSeconds({
    projectID,
    taskID,
    dateIndex,
    weekIndex,
    monthIndex,
    startTime,
    endTime,
  }) {}

  createWeeklyGoalSeconds({projectID, weekIndex, weeklyGoalSeonds}) {}

  updateRealmObject({objectData}) {}

  updateProjectDescription({projectID, description}) {}

  updateProjectGoal({projectID, weekIndex, weeklyGoalSeconds}) {}

  updateTime({projectID, startTime, endTime}) {}

  topProjectPosition({projectId}) {}

  // mark complete and incomplete
  // top the sort count
  completeTask({taskID}) {}

  deleteWeeklyGoal({projectID, weekIndex}) {}

  // deleted boolean
  deleteProject({projectID}) {}

  // deleted boolean
  restoreProject({projectID}) {}
}

const projectDB = new ProjectDB();

export default projectDB;
