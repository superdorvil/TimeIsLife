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

  sumSecondsWorked({secondsWorked}) {
    let totalSecondsWorked = 0;

    secondsWorked.forEach((sw, i) => {
      totalSecondsWorked = totalSecondsWorked + sw.endTime - sw.startTime;
    });

    return totalSecondsWorked;
  }

  getTask({realm}) {}

  getProjects({realm}) {
    return realm.objects(Schemas.project);
  }

  getSecondsWorked({
    realm,
    projectID,
    taskID,
    dateIndex,
    weekIndex,
    monthIndex,
    sortType,
    ascendingSort,
    returnList,
  }) {
    let secondsWorked = realm.objects(Schemas.secondsWorked);

    if (projectID) {
      secondsWorked = secondsWorked.filtered('projectID == $0', projectID);
    }
    if (taskID) {
      secondsWorked = secondsWorked.filtered('taskID == $0', taskID);
    }
    if (dateIndex) {
      secondsWorked = secondsWorked.filtered('dateIndex == $0', dateIndex);
    }
    if (weekIndex) {
      secondsWorked = secondsWorked.filtered('weekIndex == $0', weekIndex);
    }
    if (monthIndex) {
      secondsWorked = secondsWorked.filtered('monthIndex == $0', monthIndex);
    }

    if (returnList) {
      return secondsWorked;
    }

    return this.sumSecondsWorked({secondsWorked});
  }

  getCurrentWeeksDailySecondsWorked() {}

  getWeeklyGoal({
    realm,
    weekIndex,
    projectID = 0,
    minimumWeekIndex,
    maximumWeekIndex,
  }) {
    // return list with range
    // try (data === parseInt(data, 10))
    if (minimumWeekIndex !== undefined && maximumWeekIndex !== undefined) {
      weeklyGoal = weeklyGoal
        .filtered(
          'projectID == $0 && weekIndex < $1 && weekIndex > $2',
          projectID,
          minimumWeekIndex,
          maximumWeekIndex,
        )
        .sorted('weekIndex');
      return weeklyGoal;
    }

    let weeklyGoal = realm.objects(Schemas.weeklyGoal);

    weeklyGoal = weeklyGoal.filtered(
      'projectID == $0 && weekIndex == $1',
      projectID,
      weekIndex,
    );

    return weeklyGoal.length > 0 ? weeklyGoal[0].weeklyGoal : 0;
  }

  createProject({realm, description}) {
    const projectList = realm.objects(Schemas.project);
    let position = 0;
    let project;

    projectList.forEach((p, i) => {
      if (p.position >= position) {
        position = p.position + 1;
      }
    });

    try {
      realm.write(() => {
        project = realm.create(Schemas.project, {
          id: projectList.length + 1,
          description: description,
          position,
        });
      });
    } catch (e) {
      console.log('failed to create project ' + description);
      console.log(e);
    }

    return project;
  }

  // id prexisiting objects id + 1
  // sort order to the top
  createTask({realm, taskID, projectID, description}) {}

  // id prexisiting objects id + 1
  createProjectSeconds({
    realm,
    projectID,
    taskID,
    dateIndex,
    weekIndex,
    monthIndex,
    startTime,
    endTime,
  }) {}

  createWeeklyGoalSeconds({realm, projectID, weekIndex, weeklyGoalSeonds}) {}

  updateRealmObject({realm, objectData}) {}

  updateProjectDescription({realm, projectID, description}) {}

  updateProjectGoal({realm, projectID, weekIndex, weeklyGoalSeconds}) {}

  updateTime({realm, projectID, startTime, endTime}) {}

  topProjectPosition({realm, projectID}) {}

  // mark complete and incomplete
  // top the sort count
  completeTask({realm, taskID}) {}

  deleteWeeklyGoal({realm, projectID, weekIndex}) {}

  // deleted boolean
  deleteProject({realm, projectID}) {}

  // deleted boolean
  restoreProject({realm, projectID}) {}
}

const projectDB = new ProjectDB();

export default projectDB;
