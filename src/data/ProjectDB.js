import {DateUtils} from '_utils';
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

  getTasks({realm}) {
    return realm.objects(Schemas.task);
  }

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
    minimumWeekIndex,
    maximumWeekIndex,
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

    // return list with range
    // try (data === parseInt(data, 10))
    if (minimumWeekIndex !== undefined && maximumWeekIndex !== undefined) {
      secondsWorked = secondsWorked
        .filtered(
          'weekIndex < $0 && weekIndex > $1',
          minimumWeekIndex,
          maximumWeekIndex,
        )
        .sorted('startTime');

      return secondsWorked;
    }

    if (returnList) {
      return secondsWorked;
    }

    return this.sumSecondsWorked({secondsWorked});
  }

  getDailySecondsWorked({realm, sundayIndex, weekIndex}) {
    const dailySecondsWorked = {
      sun: {secondsWorked: 0, weekday: 'SUN'},
      mon: {secondsWorked: 0, weekday: 'MON'},
      tue: {secondsWorked: 0, weekday: 'TUE'},
      wed: {secondsWorked: 0, weekday: 'WED'},
      thu: {secondsWorked: 0, weekday: 'THU'},
      fri: {secondsWorked: 0, weekday: 'FRI'},
      sat: {secondsWorked: 0, weekday: 'SAT'},
    };
    const thisWeeksSecondsWorked = this.getSecondsWorked({
      realm,
      weekIndex,
      returnList: true,
    });

    thisWeeksSecondsWorked.forEach((sw, i) => {
      switch (sw.dateIndex) {
        case sundayIndex:
          dailySecondsWorked.sun =
            dailySecondsWorked.sun.secondsWorked + sw.startTime - sw.endTime;
          break;
        case sundayIndex + 1:
          dailySecondsWorked.mon =
            dailySecondsWorked.mon.secondsWorked + sw.startTime - sw.endTime;
          break;
        case sundayIndex + 2:
          dailySecondsWorked.tue =
            dailySecondsWorked.tue.secondsWorked + sw.startTime - sw.endTime;
          break;
        case sundayIndex + 3:
          dailySecondsWorked.wed =
            dailySecondsWorked.wed.secondsWorked + sw.startTime - sw.endTime;
          break;
        case sundayIndex + 4:
          dailySecondsWorked.thu =
            dailySecondsWorked.thu.secondsWorked + sw.startTime - sw.endTime;
          break;
        case sundayIndex + 5:
          dailySecondsWorked.fri =
            dailySecondsWorked.fri.secondsWorked + sw.startTime - sw.endTime;
          break;
        case sundayIndex + 6:
          dailySecondsWorked.sat =
            dailySecondsWorked.sat.secondsWorked + sw.startTime - sw.endTime;
          break;
        default:
      }
    });

    return dailySecondsWorked;
  }

  // If no projectID than get totalWeekly goals which has a default projectID of 0
  getWeeklyGoals({
    realm,
    weekIndex,
    projectID = 0,
    minimumWeekIndex,
    maximumWeekIndex,
  }) {
    let weeklyGoal = realm.objects(Schemas.weeklyGoal);

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

    weeklyGoal = weeklyGoal.filtered(
      'projectID == $0 && weekIndex == $1',
      projectID,
      weekIndex,
    );

    return weeklyGoal.length > 0 ? weeklyGoal[0].weeklyGoal : 0;
  }

  createProject({realm, description}) {
    const projects = realm.objects(Schemas.project);
    let position = 0;
    let project;

    projects.forEach((p, i) => {
      if (p.position >= position) {
        position = p.position + 1;
      }
    });

    try {
      realm.write(() => {
        project = realm.create(Schemas.project, {
          id: projects.length + 1,
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
  createTask({realm, projectID, description}) {
    const tasks = realm.objects(Schemas.task);
    let position = 0;
    let task;

    tasks.forEach((t, i) => {
      if (t.position >= position) {
        position = t.position + 1;
      }
    });

    try {
      realm.write(() => {
        task = realm.create(Schemas.project, {
          id: tasks.length + 1,
          projectID,
          description: description,
          position,
        });
      });
    } catch (e) {
      console.log('failed to create task ' + description);
      console.log(e);
    }

    return task;
  }

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
