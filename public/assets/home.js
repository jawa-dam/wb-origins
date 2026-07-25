import {
  loadAppState,
} from './app.js';

import {
  WORLD_ONE_MISSIONS,
} from './world-one.js';


const WORLD_ONE_ID =
  'world-1';


function getCompletedLessons(state) {
  return (
    state?.student?.completedLessons || []
  );
}


function getXP(state) {
  return state?.student?.xp || 0;
}


function getBadges(state) {
  return state?.student?.badges || [];
}


function getLevel(xp) {
  return Math.floor(xp / 500) + 1;
}


function getCompletedWorldOneMissions(state) {
  const completedLessons =
    getCompletedLessons(state);

  return WORLD_ONE_MISSIONS.filter(
    (mission) =>
      completedLessons.includes(
        mission.id
      )
  );
}


function getCurrentMission(state) {
  const completedLessons =
    getCompletedLessons(state);

  return (
    WORLD_ONE_MISSIONS.find(
      (mission) =>
        !completedLessons.includes(
          mission.id
        )
    ) || null
  );
}


function getWorldOneProgress(state) {
  const completed =
    getCompletedWorldOneMissions(
      state
    ).length;

  const total =
    WORLD_ONE_MISSIONS.length;

  return {
    completed,
    total,
    percentage: Math.round(
      (completed / total) * 100
    ),
  };
}


function updateElement(
  id,
  value
) {
  const element =
    document.getElementById(id);

  if (element) {
    element.textContent =
      value;
  }
}


function updateProgressBar(
  id,
  percentage
) {
  const element =
    document.getElementById(id);

  if (element) {
    element.style.width =
      `${percentage}%`;
  }
}


function updateStudentStats(
  state
) {
  const xp =
    getXP(state);

  const badges =
    getBadges(state);

  const completedLessons =
    getCompletedLessons(
      state
    );

  const level =
    getLevel(xp);

  updateElement(
    'home-level',
    level
  );

  updateElement(
    'home-xp',
    xp
  );

  updateElement(
    'home-badges',
    badges.length
  );

  updateElement(
    'home-lessons',
    completedLessons.length
  );
}


function updateJourneyCard(
  state
) {
  const progress =
    getWorldOneProgress(
      state
    );

  const currentMission =
    getCurrentMission(
      state
    );


  if (!currentMission) {

    updateElement(
      'journey-card-title',
      'World One Complete'
    );

    updateElement(
      'journey-current-title',
      '🏆 You completed World One'
    );

    updateElement(
      'journey-current-description',
      'You observed, questioned, connected, reasoned, and created. Your next world awaits.'
    );

    updateElement(
      'journey-progress-label',
      `${progress.total} / ${progress.total}`
    );

    updateElement(
      'continue-journey-label',
      'Continue to Academy'
    );

    updateProgressBar(
      'journey-progress',
      100
    );

    return;
  }


  updateElement(
    'journey-card-title',
    'Continue Your Journey'
  );


  updateElement(
    'journey-current-title',

    `Mission ${currentMission.number} — ${currentMission.title}`
  );


  updateElement(
    'journey-current-description',

    currentMission.description
  );


  updateElement(
    'journey-progress-label',

    `${progress.completed} / ${progress.total}`
  );


  updateElement(
    'continue-journey-label',

    progress.completed === 0
      ? 'Begin Your Journey'
      : 'Continue Your Journey'
  );


  updateProgressBar(
    'journey-progress',
    progress.percentage
  );
}


function updateJourneyState(
  state
) {
  const journeyStarted =
    state?.student?.journeyStarted;


  const button =
    document.getElementById(
      'continue-journey'
    );


  if (!button) {
    return;
  }


  if (
    journeyStarted &&
    !button.href.includes(
      'academy.html'
    )
  ) {
    button.href =
      '/academy.html';
  }
}


export function initializeHome() {
  const state =
    loadAppState();

  updateStudentStats(
    state
  );

  updateJourneyCard(
    state
  );

  updateJourneyState(
    state
  );

  makeJourneyCardClickable();
}
function makeJourneyCardClickable() {
  const card =
    document.getElementById(
      'journey-card'
    );

  const button =
    document.getElementById(
      'continue-journey'
    );

  if (!card) {
    return;
  }

  function goToAcademy(event) {
    /*
     * If the user clicked the actual
     * Continue button, let that link
     * behave normally.
     */
    if (
      event.target.closest(
        '#continue-journey'
      )
    ) {
      return;
    }

    window.location.href =
      '/academy.html';
  }

  card.addEventListener(
    'click',
    goToAcademy
  );

  card.addEventListener(
    'keydown',
    (event) => {
      if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();

        window.location.href =
          '/academy.html';
      }
    }
  );
}