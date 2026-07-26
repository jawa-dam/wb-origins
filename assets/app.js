import { readState, writeState, clearState } from './storage.js';

const defaultAppState = {
  student: {
    xp: 0,
    badges: [],
    completedLessons: [],
    lastPage: 'home',
    journeyStarted: false,
    currentWorld: 'world-1',
    currentLesson: 'mission-1',
  },

  studio: {
    projects: [],
    activeProjectId: null,
  },

  playground: {
    counter: 0,
    notes: [],
  },
};

export function loadAppState() {
  return readState('app-state-v1', defaultAppState);
}

export function saveAppState(state) {
  writeState('app-state-v1', state);
}

export function resetAppState() {
  clearState('app-state-v1');
  return structuredClone(defaultAppState);
}

export function getXp(state) {
  return state.student.xp ?? 0;
}

export function setLastPage(state, page) {
  state.student.lastPage = page;
  saveAppState(state);
}

export function awardXp(state, amount) {
  state.student.xp = Math.max(0, (state.student.xp ?? 0) + amount);
  saveAppState(state);
}

export function addBadge(state, badge) {
  if (!state.student.badges.includes(badge)) {
    state.student.badges.push(badge);
    saveAppState(state);
  }
}

export function completeLesson(state, lessonId) {
  if (!state.student.completedLessons.includes(lessonId)) {
    state.student.completedLessons.push(lessonId);
    state.student.xp = (state.student.xp ?? 0) + 100;
    saveAppState(state);
  }
}

export function isLessonCompleted(state, lessonId) {
  return state.student.completedLessons.includes(lessonId);
}

export function getResumeLesson(state) {
  const lessons = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5'];
  return lessons.find((lesson) => !state.student.completedLessons.includes(lesson)) ?? null;
}
// =========================================
// GEI APPLICATION STATE
// =========================================

const STORAGE_KEY =
  'gei-app-state-v1';


const DEFAULT_STATE = {

  student: {

    journeyStarted:
      false,

    currentWorld:
      'world-1',

    currentMission:
      'mission-1',

    completedLessons:
      [],

    xp:
      0,

    badges:
      [],

    worldOneComplete:
      false,

  },

};


// =========================================
// LOAD STATE
// =========================================

export function loadAppState() {

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    );


  if (!saved) {

    return structuredClone(
      DEFAULT_STATE
    );

  }


  try {

    return {
      ...structuredClone(
        DEFAULT_STATE
      ),

      ...JSON.parse(
        saved
      ),

    };

  } catch (error) {

    console.error(
      'GEI state could not be loaded.',
      error
    );


    return structuredClone(
      DEFAULT_STATE
    );

  }

}


// =========================================
// SAVE STATE
// =========================================

export function saveAppState(
  state
) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(
      state
    )

  );

}


// =========================================
// RESET STATE
// =========================================

export function resetAppState() {

  localStorage.removeItem(
    STORAGE_KEY
  );

}