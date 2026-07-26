// =========================================
// GEI ACADEMY PAGE
// =========================================
import {
  saveObservations,
  loadObservations,
  validateObservations,
} from './observation-engine.js';

import {
  startJourney,
  getCurrentMission,
  completeMission,
  getJourneyProgress,
  isJourneyStarted,
  isWorldOneComplete,
} from './academy-journey.js';


// =========================================
// ELEMENTS
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


// =========================================
// RENDER CURRENT MISSION
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
// RENDER JOURNEY STATE
// =========================================

function renderJourneyState() {

  const started =
    isJourneyStarted();


  const complete =
    isWorldOneComplete();


  const progress =
    getJourneyProgress();


  if (
    beginButton
  ) {

    beginButton.hidden =
      started;

  }


  if (
    resumeButton
  ) {

    resumeButton.hidden =
      !started ||
      complete;

  }


  if (
    completeButton
  ) {

    completeButton.hidden =
      !started ||
      complete;

  }


  const progressLabel =
    document.getElementById(
      'academy-progress-label'
    );


  if (
    progressLabel
  ) {

    progressLabel.textContent =
      `${progress.completed} / ${progress.total}`;

  }


  const progressBar =
    document.getElementById(
      'academy-progress'
    );


  if (
    progressBar
  ) {

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
// COMPLETE MISSION
// =========================================

function handleCompleteMission() {

  const mission =
    getCurrentMission();


  completeMission(
    mission.id
  );


  renderCurrentMission();


  renderJourneyState();


  alert(
    `Mission complete! +${mission.xp} XP earned.`
  );

}


// =========================================
// EVENT LISTENERS
// =========================================

if (
  beginButton
) {

  beginButton.addEventListener(
    'click',
    handleBeginJourney
  );

}


if (
  resumeButton
) {

  resumeButton.addEventListener(
    'click',
    handleResumeJourney
  );

}


if (
  completeButton
) {

  completeButton.addEventListener(
    'click',
    handleCompleteMission
  );

}


// =========================================
// INITIALIZE
// =========================================

renderCurrentMission();

renderJourneyState();

initializeObservationMission();
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

  const badgeReward =
    document.getElementById(
      'discovery-badge-reward'
    );

  const currentMission =
    getCurrentMission();


  if (!overlay) {
    return;
  }


  title.textContent =
    'Mission Complete';


  message.textContent =
    `You completed Mission ${completedMission.number} — ${completedMission.title}. Your observation has become a new step in your journey.`;


  xp.textContent =
    `+${completedMission.xp} XP`;


  badge.textContent =
    completedMission.badge;


  if (
    currentMission &&
    currentMission.id !==
      completedMission.id
  ) {

    next.hidden =
      false;


    nextTitle.textContent =
      `Mission ${currentMission.number} — ${currentMission.title}`;


    nextDescription.textContent =
      currentMission.description;

  } else {

    next.hidden =
      false;


    nextTitle.textContent =
      'World One Complete';


    nextDescription.textContent =
      'You have completed the first GEI creative journey. A new world awaits.';

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
submitButton.addEventListener(
    'click',
    handleObservationSubmit
  );
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

    feedback.hidden =
      false;


    feedback.textContent =
      'Take another look. Mission 1 requires three observations. Describe what you can see, hear, notice, or identify without explaining what it means yet.';


    return;

  }


  feedback.hidden =
    false;


  feedback.textContent =
    'Excellent. You slowed down, looked closely, and recorded what you observed before interpreting it.';


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