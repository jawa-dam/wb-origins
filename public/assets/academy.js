import {
  loadAppState,
  saveAppState,
  addBadge,
} from './app.js';

import {
  WORLD_ONE_MISSIONS,
} from './world-one.js';

function getCurrentMission(state) {
  return (
    WORLD_ONE_MISSIONS.find(
      (mission) =>
        !state.student.completedLessons.includes(mission.id)
    ) || null
  );
}

function getMissionById(id) {
  return WORLD_ONE_MISSIONS.find(
    (mission) => mission.id === id
  );
}

function updateWorldProgress(state) {
  const completed =
    state.student.completedLessons.filter((id) =>
      WORLD_ONE_MISSIONS.some(
        (mission) => mission.id === id
      )
    ).length;

  const total = WORLD_ONE_MISSIONS.length;
  const percent = Math.round((completed / total) * 100);

  const progress = document.getElementById(
    'world-one-progress'
  );

  const label = document.getElementById(
    'world-one-progress-label'
  );

  if (progress) {
    progress.style.width = `${percent}%`;
  }

  if (label) {
    label.textContent = `${completed} / ${total} missions`;
  }
}

function renderMissionList(state) {
  const container = document.getElementById(
    'world-one-missions'
  );

  if (!container) return;

  container.innerHTML = '';

  WORLD_ONE_MISSIONS.forEach((mission, index) => {
    const completed =
      state.student.completedLessons.includes(
        mission.id
      );

    const previousMission =
      WORLD_ONE_MISSIONS[index - 1];

    const previousComplete =
      !previousMission ||
      state.student.completedLessons.includes(
        previousMission.id
      );

    const unlocked =
      completed || previousComplete;

    const card = document.createElement('button');

    card.type = 'button';

    card.className = 'mission-item';

    if (completed) {
      card.classList.add('completed');
    }

    if (!unlocked) {
      card.classList.add('locked');
      card.disabled = true;
    }

    card.innerHTML = `
      <span class="mission-number">
        ${completed ? '✓' : mission.number}
      </span>

      <span class="mission-content">
        <strong>${mission.title}</strong>
        <small>${mission.subtitle}</small>
      </span>

      <span class="mission-status">
        ${
          completed
            ? 'Completed'
            : unlocked
              ? 'Begin'
              : 'Locked'
        }
      </span>
    `;

    if (unlocked) {
      card.addEventListener('click', () => {
        openMission(state, mission.id);
      });
    }

    container.appendChild(card);
  });
}

function openMission(state, missionId) {
  const mission = getMissionById(missionId);

  if (!mission) return;

  state.student.currentLesson = mission.id;

  saveAppState(state);

  const label = document.getElementById(
    'mission-label'
  );

  const title = document.getElementById(
    'mission-title'
  );

  const description = document.getElementById(
    'mission-description'
  );

  const prompt = document.getElementById(
    'mission-prompt'
  );

  const response = document.getElementById(
    'mission-response'
  );

  const feedback = document.getElementById(
    'mission-feedback'
  );

  if (label) {
    label.textContent =
      `Mission ${mission.number} · ${mission.xp} XP`;
  }

  if (title) {
    title.textContent = mission.title;
  }

  if (description) {
    description.textContent =
      mission.description;
  }

  if (prompt) {
    prompt.textContent =
      getMissionPrompt(mission.id);
  }

  if (response) {
    response.value = '';
  }

  if (feedback) {
    feedback.textContent = '';
  }

  document
    .getElementById('active-mission')
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
}

function getMissionPrompt(missionId) {
  switch (missionId) {
    case 'mission-1':
      return 'What is one thing you genuinely notice?';

    case 'mission-2':
      return 'What questions does your observation create?';

    case 'mission-3':
      return 'What other idea, object, or pattern connects to your observation?';

    case 'mission-4':
      return 'What is your reasoned explanation of the connection you discovered?';

    case 'mission-5':
      return 'What can you create from what you have learned?';

    default:
      return 'What did you discover?';
  }
}

function completeCurrentMission(state) {
  const currentId =
    state.student.currentLesson;

  const mission =
    getMissionById(currentId);

  if (!mission) return;

  const response =
    document.getElementById(
      'mission-response'
    );

  const feedback =
    document.getElementById(
      'mission-feedback'
    );

  if (!response?.value.trim()) {
    if (feedback) {
      feedback.textContent =
        'Write your discovery before completing the mission.';
    }

    return;
  }

  if (
    state.student.completedLessons.includes(
      mission.id
    )
  ) {
    return;
  }

  state.student.completedLessons.push(
    mission.id
  );

  state.student.xp += mission.xp;

  addBadge(
    state,
    mission.badge
  );

  const nextMission =
    WORLD_ONE_MISSIONS.find(
      (item) =>
        !state.student.completedLessons.includes(
          item.id
        )
    );

  if (nextMission) {
    state.student.currentLesson =
      nextMission.id;
  }

  saveAppState(state);

  if (feedback) {
    feedback.textContent =
      `Mission complete! +${mission.xp} XP earned.`;
  }

  updateWorldProgress(state);

  renderMissionList(state);

  if (nextMission) {
    setTimeout(() => {
      openMission(
        state,
        nextMission.id
      );
    }, 700);
  } else {
    showWorldComplete();
  }
}

function showWorldComplete() {
  const feedback =
    document.getElementById(
      'mission-feedback'
    );

  if (feedback) {
    feedback.textContent =
      '🏆 World One complete! You are ready for the next world.';
  }
}

function wireMissionControls(state) {
  const completeButton =
    document.getElementById(
      'complete-mission'
    );

  if (completeButton) {
    completeButton.addEventListener(
      'click',
      () => {
        completeCurrentMission(state);
      }
    );
  }
}

function initialize() {
  const state = loadAppState();

  state.student.journeyStarted ??= false;

  state.student.currentWorld ??=
    'world-1';

  state.student.currentLesson ??=
    'mission-1';

  renderMissionList(state);

  updateWorldProgress(state);

  wireMissionControls(state);

  const currentMission =
    getCurrentMission(state);

  if (currentMission) {
    openMission(
      state,
      currentMission.id
    );
  }
}

document.addEventListener(
  'DOMContentLoaded',
  initialize
);