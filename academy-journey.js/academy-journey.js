// =========================================
// GEI ACADEMY JOURNEY CONTROLLER
// =========================================

import {
  loadAppState,
  saveAppState,
} from './app.js';

import {
  WORLD_ONE_MISSIONS,
} from './world-one.js';


// =========================================
// CONSTANTS
// =========================================

const WORLD_ONE_ID =
  'world-1';


// =========================================
// STATE HELPERS
// =========================================

function getState() {
  return loadAppState();
}


function getStudent(state) {
  return state.student;
}


function getCompletedLessons(state) {
  return (
    state.student.completedLessons || []
  );
}


function getCurrentMissionId(state) {
  return (
    state.student.currentMission ||
    WORLD_ONE_MISSIONS[0].id
  );
}


// =========================================
// JOURNEY START
// =========================================

export function startJourney() {
  const state =
    getState();

  state.student.journeyStarted =
    true;

  state.student.currentWorld =
    WORLD_ONE_ID;

  state.student.currentMission =
    WORLD_ONE_MISSIONS[0].id;

  saveAppState(state);

  return state;
}


// =========================================
// CURRENT MISSION
// =========================================

export function getCurrentMission() {
  const state =
    getState();

  const currentMissionId =
    getCurrentMissionId(
      state
    );

  return (
    WORLD_ONE_MISSIONS.find(
      (mission) =>
        mission.id ===
        currentMissionId
    ) ||
    WORLD_ONE_MISSIONS[0]
  );
}


// =========================================
// JOURNEY STATUS
// =========================================

export function isJourneyStarted() {
  const state =
    getState();

  return Boolean(
    state.student.journeyStarted
  );
}


// =========================================
// COMPLETE MISSION
// =========================================

export function completeMission(
  missionId
) {
  const state =
    getState();

  const mission =
    WORLD_ONE_MISSIONS.find(
      (item) =>
        item.id === missionId
    );

  if (!mission) {
    return state;
  }


  const completedLessons =
    getCompletedLessons(
      state
    );


  const alreadyCompleted =
    completedLessons.includes(
      missionId
    );


  if (
    alreadyCompleted
  ) {
    return state;
  }


  // Add completed mission

  state.student.completedLessons.push(
    missionId
  );


  // Award XP

  state.student.xp =
    (state.student.xp || 0) +
    mission.xp;


  // Award badge

  if (
    mission.badge &&
    !state.student.badges.includes(
      mission.badge
    )
  ) {
    state.student.badges.push(
      mission.badge
    );
  }


  // Unlock next mission

  const currentIndex =
    WORLD_ONE_MISSIONS.findIndex(
      (item) =>
        item.id === missionId
    );


  const nextMission =
    WORLD_ONE_MISSIONS[
      currentIndex + 1
    ];


  if (nextMission) {

    state.student.currentMission =
      nextMission.id;

  } else {

    state.student.currentMission =
      null;

    state.student.worldOneComplete =
      true;
  }


  saveAppState(state);


  return state;
}


// =========================================
// JOURNEY PROGRESS
// =========================================

export function getJourneyProgress() {
  const state =
    getState();

  const completed =
    getCompletedLessons(
      state
    ).filter(
      (lessonId) =>
        WORLD_ONE_MISSIONS.some(
          (mission) =>
            mission.id ===
            lessonId
        )
    );


  const total =
    WORLD_ONE_MISSIONS.length;


  return {
    completed:
      completed.length,

    total,

    percentage:
      Math.round(
        (
          completed.length /
          total
        ) * 100
      ),
  };
}


// =========================================
// WORLD ONE COMPLETION
// =========================================

export function isWorldOneComplete() {
  const progress =
    getJourneyProgress();

  return (
    progress.completed >=
    progress.total
  );
}