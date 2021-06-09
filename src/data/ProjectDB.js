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

  updateProjectSecondsData({realm, projectID}) {
    const projects = this.getProjects({realm});
    const weekIndex = DateUtils.getWeekIndex({date: new Date()});
    let updateProject = true;
    if (projectID) {
      updateProject = false;
    }

    realm.write(() => {
      projects.forEach((project, i) => {
        if (project.id === projectID) {
          updateProject = true;
        }

        if (updateProject) {
          project.totalSecondsWorked = this.getSecondsWorked({
            realm,
            projectID: project.id,
          });

          project.thisWeeksSecondsWorked = this.getSecondsWorked({
            realm,
            projectID: project.id,
            weekIndex,
          });

          project.thisWeeksSecondsGoal = this.getWeeklyGoals({
            realm,
            projectID: project.id,
            weekIndex,
          });
        }

        if (project.id === projectID) {
          updateProject = false;
        }
      });
    });
  }

  getSettings({realm}) {
    return realm.objects(Schemas.settings)[0];
  }

  updateColorScheme({realm, colorScheme}) {
    const settings = this.getSettings({realm});

    realm.write(() => {
      settings.colorScheme = colorScheme;
    });
  }

  sumSecondsWorked({secondsWorked}) {
    let totalSecondsWorked = 0;

    secondsWorked.forEach((sw, i) => {
      totalSecondsWorked =
        totalSecondsWorked + (sw.endTime - sw.startTime) / 1000;
    });

    return totalSecondsWorked;
  }

  getTasks({realm, taskID}) {
    if (taskID) {
      return realm.objectForPrimaryKey(Schemas.task, taskID);
    }

    return realm.objects(Schemas.task);
  }

  getProjects({realm, projectID}) {
    if (projectID) {
      return realm.objectForPrimaryKey(Schemas.project, projectID);
    }

    return realm.objects(Schemas.project);
  }

  getSecondsWorked({
    realm,
    projectID,
    taskID,
    dateIndex,
    weekIndex,
    monthIndex,
    yearIndex,
    sortType,
    ascendingSort,
    returnList,
    limit,
  }) {
    let secondsWorked = realm
      .objects(Schemas.secondsWorked)
      .sorted('startTime', true);

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
    if (yearIndex) {
      secondsWorked = secondsWorked.filtered('yearIndex == $0', yearIndex);
    }

    if (limit) {
      if (secondsWorked.length > limit) {
        secondsWorked = secondsWorked.filtered(
          'dateIndex >= $0',
          secondsWorked[limit].dateIndex,
        );
      }

      return secondsWorked; //as a list
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
          dailySecondsWorked.sun.secondsWorked =
            dailySecondsWorked.sun.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 1:
          dailySecondsWorked.mon.secondsWorked =
            dailySecondsWorked.mon.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 2:
          dailySecondsWorked.tue.secondsWorked =
            dailySecondsWorked.tue.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 3:
          dailySecondsWorked.wed.secondsWorked =
            dailySecondsWorked.wed.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 4:
          dailySecondsWorked.thu.secondsWorked =
            dailySecondsWorked.thu.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 5:
          dailySecondsWorked.fri.secondsWorked =
            dailySecondsWorked.fri.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 6:
          dailySecondsWorked.sat.secondsWorked =
            dailySecondsWorked.sat.secondsWorked + (sw.endTime - sw.startTime);
          break;
        default:
        // error checking
      }
    });

    dailySecondsWorked.sun.secondsWorked =
      dailySecondsWorked.sun.secondsWorked / 1000;
    dailySecondsWorked.mon.secondsWorked =
      dailySecondsWorked.mon.secondsWorked / 1000;
    dailySecondsWorked.tue.secondsWorked =
      dailySecondsWorked.tue.secondsWorked / 1000;
    dailySecondsWorked.wed.secondsWorked =
      dailySecondsWorked.wed.secondsWorked / 1000;
    dailySecondsWorked.thu.secondsWorked =
      dailySecondsWorked.thu.secondsWorked / 1000;
    dailySecondsWorked.fri.secondsWorked =
      dailySecondsWorked.fri.secondsWorked / 1000;
    dailySecondsWorked.sat.secondsWorked =
      dailySecondsWorked.sat.secondsWorked / 1000;

    return dailySecondsWorked;
  }

  // If no projectID than get totalWeekly goals which has a default projectID of 0
  getWeeklyGoals({realm, weekIndex, projectID = 0}) {
    let weeklyGoal = realm.objects(Schemas.weeklyGoal);

    weeklyGoal = weeklyGoal.filtered(
      'projectID == $0 AND weekIndex == $1',
      projectID,
      weekIndex,
    );

    return weeklyGoal.length > 0 ? weeklyGoal[0].weeklyGoalSeconds : 0;
  }

  createProject({realm, description}) {
    const projects = realm.objects(Schemas.project);
    let project;

    try {
      realm.write(() => {
        project = realm.create(Schemas.project, {
          id: projects.length + 1,
          description: description,
          position: this.getTopPosition(projects),
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
        task = realm.create(Schemas.task, {
          id: tasks.length + 1,
          projectID,
          description: description,
          position: this.getTopPosition(tasks),
        });
      });
    } catch (e) {
      console.log('failed to create task ' + description);
      console.log(e);
    }

    return task;
  }

  createWeeklyGoal({realm, projectID, weekIndex, weeklyGoalSeconds}) {
    let weeklyGoal;

    realm.write(() => {
      weeklyGoal = realm.create(Schemas.weeklyGoal, {
        projectID,
        weekIndex,
        weeklyGoalSeconds,
      });
    });

    if (projectID > 0) {
      this.updateProjectSecondsData({realm, projectID});
    }

    return weeklyGoal;
  }

  createSecondsWorked({
    realm,
    projectID,
    dateIndex,
    weekIndex,
    monthIndex,
    yearIndex,
    startTime,
    endTime,
  }) {
    let secondsWorked;

    realm.write(() => {
      secondsWorked = realm.create(Schemas.secondsWorked, {
        id: realm.objects(Schemas.secondsWorked).length + 1,
        projectID,
        dateIndex,
        weekIndex,
        monthIndex,
        yearIndex,
        startTime,
        endTime,
      });
    });

    this.updateProjectSecondsData({realm, projectID});

    return secondsWorked;
  }

  editProject({realm, projectID, description}) {
    const project = realm.objectForPrimaryKey(Schemas.project, projectID);

    realm.write(() => {
      project.description = description;
    });
  }

  editTask({realm, taskID, description}) {
    const task = realm.objectForPrimaryKey(Schemas.task, taskID);

    realm.write(() => {
      task.description = description;
    });
  }

  updateWeeklyGoal({realm, projectID = 0, weekIndex, weeklyGoalSeconds}) {
    let weeklyGoal = realm
      .objects(Schemas.weeklyGoal)
      .filtered('projectID == $0 AND weekIndex == $1', projectID, weekIndex);

    if (weeklyGoal.length === 0) {
      weeklyGoal = this.createWeeklyGoal({
        realm,
        projectID,
        weekIndex,
        weeklyGoalSeconds,
      });
    } else {
      realm.write(() => {
        if (weeklyGoal.length > 0) {
          weeklyGoal[0].weeklyGoalSeconds = weeklyGoalSeconds;
        }
      });
    }

    if (projectID > 0) {
      this.updateProjectSecondsData({realm, projectID});
    }

    return weeklyGoal;
  }

  updateSecondsWorked({
    realm,
    secondsWorkedID,
    hours,
    minutes,
    updateStartTime,
  }) {
    const secondsWorked = realm.objectForPrimaryKey(
      Schemas.secondsWorked,
      secondsWorkedID,
    );
    const startTime = secondsWorked.startTime;
    const endTime = secondsWorked.endTime;

    realm.write(() => {
      if (updateStartTime) {
        startTime.setHours(hours);
        startTime.setMinutes(minutes);
        secondsWorked.startTime = startTime;
      } else {
        endTime.setHours(hours);
        endTime.setMinutes(minutes);
        secondsWorked.endTime = endTime;
      }
    });

    this.updateProjectSecondsData({realm, projectID: secondsWorked.projectID});
  }

  topProjectPosition({realm, projectID}) {
    const project = realm.objectForPrimaryKey(Schemas.project, projectID);

    realm.write(() => {
      project.position = this.getTopPosition(realm.objects(Schemas.projects));
    });
  }

  startTimer({realm, projectID}) {
    const project = realm.objectForPrimaryKey(Schemas.project, projectID);

    realm.write(() => {
      project.timerStartTime = new Date();
      project.timerActive = true;
    });
  }

  stopTimer({realm, projectID}) {
    const project = realm.objectForPrimaryKey(Schemas.project, projectID);
    const endTime = new Date();
    const dateIndex = DateUtils.getDateIndex({date: project.timerStartTime});
    const weekIndex = DateUtils.getWeekIndex({date: project.timerStartTime});
    const monthIndex = DateUtils.getMonthIndex({date: project.timerStartTime});
    const yearIndex = DateUtils.getYearIndex({date: project.timerStartTime});

    realm.write(() => {
      project.timerActive = false;
    });

    this.createSecondsWorked({
      realm,
      projectID,
      dateIndex,
      weekIndex,
      monthIndex,
      yearIndex,
      startTime: project.timerStartTime,
      endTime,
    });
  }

  completeTask({realm, taskID}) {
    const task = realm.objectForPrimaryKey(Schemas.task, taskID);

    realm.write(() => {
      task.position = this.getTopPosition(realm.objects(Schemas.task));
      task.completed = !task.completed;
    });
  }

  deleteWeeklyGoal({realm, projectID, weekIndex}) {}

  // deleted boolean
  deleteProject({realm, projectID}) {}

  // deleted boolean
  restoreProject({realm, projectID}) {}

  getTopPosition(objects) {
    let position = 0;

    objects.forEach((o, i) => {
      if (o.position >= position) {
        position = position + 1;
      }
    });

    return position;
  }
}

const projectDB = new ProjectDB();

export default projectDB;
