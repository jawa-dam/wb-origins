import { loadAppState, saveAppState, resetAppState } from './app.js';

const defaultProjects = [
  { id: 'project-1', name: 'GEI Academy Lesson Draft' },
  { id: 'project-2', name: 'GEI Playground Prototype' },
];

function loadStudioState(state) {
  if (!Array.isArray(state.studio.projects) || state.studio.projects.length === 0) {
    state.studio.projects = structuredClone(defaultProjects);
  }

  if (!state.studio.activeProjectId && state.studio.projects.length) {
    state.studio.activeProjectId = state.studio.projects[0].id;
  }

  return state;
}

function render(state) {
  const list = document.getElementById('studio-project-list');
  const active = document.getElementById('studio-active-project');
  const saved = document.getElementById('studio-saved');
  if (!list || !active) return;

  list.innerHTML = '';

  for (const project of state.studio.projects) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'lesson-item';
    if (project.id === state.studio.activeProjectId) item.classList.add('completed');
    item.textContent = project.name;

    item.addEventListener('click', () => {
      state.studio.activeProjectId = project.id;
      saveAppState(state);
      render(state);
    });

    list.appendChild(item);
  }

  const current = state.studio.projects.find((project) => project.id === state.studio.activeProjectId);
  active.textContent = current ? current.name : 'No active project';

  if (saved) {
    saved.textContent = 'Workspace saved in your browser.';
  }
}

function wireButtons(state) {
  const addButton = document.getElementById('studio-add-project');
  const resetButton = document.getElementById('studio-reset');

  if (addButton) {
    addButton.addEventListener('click', () => {
      const nextNumber = state.studio.projects.length + 1;
      const id = `project-${Date.now()}`;
      const name = `Studio Project ${nextNumber}`;

      state.studio.projects.push({ id, name });
      state.studio.activeProjectId = id;
      saveAppState(state);
      render(state);
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      const fresh = resetAppState();
      state.student = fresh.student;
      state.studio = structuredClone(fresh.studio);
      state.playground = structuredClone(fresh.playground);
      saveAppState(state);
      render(state);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const state = loadStudioState(loadAppState());
  saveAppState(state);
  render(state);
  wireButtons(state);
});