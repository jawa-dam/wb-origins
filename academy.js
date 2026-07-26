// =========================================
// GEI ACADEMY
// JOURNEY + MISSION + OBSERVATION ENGINE
// =========================================

import {
  startJourney,
  getCurrentMission,
  completeMission,
  getJourneyProgress,
  isJourneyStarted,
  isWorldOneComplete,
} from './academy-journey.js';

import {
  saveObservations,
  loadObservations,
  validateObservations,
} from './observation-engine.js';


// =========================================
// PAGE ELEMENTS
// =========================================

const beginButton =
  document.getElementById(
    'begin-journey'
  );

const resumeButton =
  document.getElementById(
    'resume-journey'
  );

const completeButton =
  document.getElementById(
    'complete-mission'
  );

const submitObservationButton =
  document.getElementById(
    'submit-observation'
  );


// =========================================
// RENDER CURRENT MISSION
// =========================================

function renderCurrentMission() {
  const mission =
    getCurrentMission();


  const title =
    document.getElementById(
      'current-mission-title'
    );


  const subtitle =
    document.getElementById(
      'current-mission-subtitle'
    );


  const description =
    document.getElementById(
      'current-mission-description'
    );


  if (title) {
    title.textContent =
      `Mission ${mission.number} — ${mission.title}`;
  }


  if (subtitle) {
    subtitle.textContent =
      mission.subtitle;
  }


  if (description) {
    description.textContent =
      mission.description;
  }
}


// =========================================
// RENDER JOURNEY STATE
// =========================================

function renderJourneyState() {
  const started =
    isJourneyStarted();


  const complete =
    isWorldOneComplete();


  const progress =
    getJourneyProgress();


  if (beginButton) {
    beginButton.hidden =
      started;
  }


  if (resumeButton) {
    resumeButton.hidden =
      !started ||
      complete;
  }


  if (completeButton) {
    completeButton.hidden =
      !started ||
      complete;
  }


  const progressLabel =
    document.getElementById(
      'academy-progress-label'
    );


  if (progressLabel) {
    progressLabel.textContent =
      `${progress.completed} / ${progress.total}`;
  }


  const progressBar =
    document.getElementById(
      'academy-progress'
    );


  if (progressBar) {
    progressBar.style.width =
      `${progress.percentage}%`;
  }
}


// =========================================
// BEGIN JOURNEY
// =========================================

function handleBeginJourney() {
  startJourney();


  renderCurrentMission();


  renderJourneyState();


  document
    .getElementById(
      'current-mission'
    )
    ?.scrollIntoView({
      behavior:
        'smooth',
    });
}


// =========================================
// RESUME JOURNEY
// =========================================

function handleResumeJourney() {
  renderCurrentMission();


  renderJourneyState();


  document
    .getElementById(
      'current-mission'
    )
    ?.scrollIntoView({
      behavior:
        'smooth',
    });
}


// =========================================
// DISCOVERY MOMENT
// =========================================

function showDiscoveryMoment(
  completedMission
) {
  const overlay =
    document.getElementById(
      'discovery-moment'
    );


  if (!overlay) {
    return;
  }


  const title =
    document.getElementById(
      'discovery-title'
    );


  const message =
    document.getElementById(
      'discovery-message'
    );


  const xp =
    document.getElementById(
      'discovery-xp'
    );


  const badge =
    document.getElementById(
      'discovery-badge'
    );


  const next =
    document.getElementById(
      'discovery-next'
    );


  const nextTitle =
    document.getElementById(
      'discovery-next-title'
    );


  const nextDescription =
    document.getElementById(
      'discovery-next-description'
    );


  if (title) {
    title.textContent =
      'Mission Complete';
  }


  if (message) {
    message.textContent =
      `You completed Mission ${completedMission.number} — ${completedMission.title}. Your observation has become a new step in your journey.`;
  }


  if (xp) {
    xp.textContent =
      `+${completedMission.xp} XP`;
  }


  if (badge) {
    badge.textContent =
      completedMission.badge;
  }


  const currentMission =
    getCurrentMission();


  if (
    currentMission &&
    currentMission.id !==
      completedMission.id
  ) {
    if (next) {
      next.hidden =
        false;
    }


    if (nextTitle) {
      nextTitle.textContent =
        `Mission ${currentMission.number} — ${currentMission.title}`;
    }


    if (nextDescription) {
      nextDescription.textContent =
        currentMission.description;
    }

  } else {
    if (next) {
      next.hidden =
        false;
    }


    if (nextTitle) {
      nextTitle.textContent =
        'World One Complete';
    }


    if (nextDescription) {
      nextDescription.textContent =
        'You have completed the first GEI creative journey. A new world awaits.';
    }
  }


  overlay.hidden =
    false;


  overlay.setAttribute(
    'aria-hidden',
    'false'
  );


  document.body.classList.add(
    'discovery-open'
  );


  document
    .getElementById(
      'discovery-continue'
    )
    ?.focus();
}


// =========================================
// CLOSE DISCOVERY MOMENT
// =========================================

function closeDiscoveryMoment() {
  const overlay =
    document.getElementById(
      'discovery-moment'
    );


  if (!overlay) {
    return;
  }


  overlay.hidden =
    true;


  overlay.setAttribute(
    'aria-hidden',
    'true'
  );


  document.body.classList.remove(
    'discovery-open'
  );
}


// =========================================
// MISSION 1 — OBSERVE
// =========================================

function initializeObservationMission() {
  const submitButton =
    document.getElementById(
      'submit-observation'
    );


  if (!submitButton) {
    return;
  }


  const observationFields = [

    document.getElementById(
      'observation-1'
    ),

    document.getElementById(
      'observation-2'
    ),

    document.getElementById(
      'observation-3'
    ),

  ];


  const savedObservations =
    loadObservations();


  observationFields.forEach(
    (
      field,
      index
    ) => {

      if (field) {
        field.value =
          savedObservations[
            index
          ] || '';
      }

    }
  );


  submitButton.addEventListener(
    'click',
    handleObservationSubmit
  );
}


// =========================================
// SUBMIT OBSERVATION
// =========================================

function handleObservationSubmit() {
  const observations = [

    document.getElementById(
      'observation-1'
    )?.value || '',

    document.getElementById(
      'observation-2'
    )?.value || '',

    document.getElementById(
      'observation-3'
    )?.value || '',

  ];


  const feedback =
    document.getElementById(
      'observation-feedback'
    );


  saveObservations(
    observations
  );


  if (
    !validateObservations(
      observations
    )
  ) {

    if (feedback) {
      feedback.hidden =
        false;


      feedback.textContent =
        'Take another look. Mission 1 requires three observations. Describe what you can see, hear, notice, or identify without explaining what it means yet.';
    }


    return;
  }


  if (feedback) {
    feedback.hidden =
      false;


    feedback.textContent =
      'Excellent. You slowed down, looked closely, and recorded what you observed before interpreting it.';
  }


  const mission =
    getCurrentMission();


  completeMission(
    mission.id
  );


  renderCurrentMission();


  renderJourneyState();


  showDiscoveryMoment(
    mission
  );
}


// =========================================
// GENERIC MISSION COMPLETION
// =========================================

function handleCompleteMission() {
  const mission =
    getCurrentMission();


  completeMission(
    mission.id
  );


  renderCurrentMission();


  renderJourneyState();


  showDiscoveryMoment(
    mission
  );
}


// =========================================
// EVENT LISTENERS
// =========================================

if (beginButton) {
  beginButton.addEventListener(
    'click',
    handleBeginJourney
  );
}


if (resumeButton) {
  resumeButton.addEventListener(
    'click',
    handleResumeJourney
  );
}


if (completeButton) {
  completeButton.addEventListener(
    'click',
    handleCompleteMission
  );
}


// =========================================
// DISCOVERY MOMENT BUTTONS
// =========================================

const discoveryContinue =
  document.getElementById(
    'discovery-continue'
  );


const discoveryClose =
  document.getElementById(
    'discovery-close'
  );


if (discoveryContinue) {
  discoveryContinue.addEventListener(
    'click',
    () => {

      closeDiscoveryMoment();


      document
        .getElementById(
          'current-mission'
        )
        ?.scrollIntoView({
          behavior:
            'smooth',
        });

    }
  );
}


if (discoveryClose) {
  discoveryClose.addEventListener(
    'click',
    closeDiscoveryMoment
  );
}


// =========================================
// ESCAPE KEY
// =========================================

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key ===
      'Escape'
    ) {
      closeDiscoveryMoment();
    }

  }
);


// =========================================
// INITIALIZE ACADEMY
// =========================================

renderCurrentMission();

renderJourneyState();

initializeObservationMission();