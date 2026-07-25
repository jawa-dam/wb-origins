import { loadAppState, saveAppState, resetAppState } from './app.js';

function loadPlaygroundState(state) {
  if (!state.playground) {
    state.playground = { counter: 0, notes: [] };
  }
  if (!Array.isArray(state.playground.notes)) {
    state.playground.notes = [];
  }
  if (typeof state.playground.counter !== 'number') {
    state.playground.counter = 0;
  }
  return state;
}

function render(state) {
  const countEl = document.getElementById('playground-count');
  const notesEl = document.getElementById('playground-notes');
  const noteInput = document.getElementById('playground-note');

  if (countEl) countEl.textContent = String(state.playground.counter);

  if (notesEl) {
    notesEl.innerHTML = '';
    for (const note of state.playground.notes) {
      const item = document.createElement('div');
      item.className = 'lesson-item';
      item.textContent = note;
      notesEl.appendChild(item);
    }
  }

  if (noteInput && state.playground.notes.length === 0) {
    noteInput.value = '';
  }
}

function wireButtons(state) {
  const plusButton = document.getElementById('playground-plus');
  const minusButton = document.getElementById('playground-minus');
  const clearButton = document.getElementById('playground-clear');
  const addNoteButton = document.getElementById('playground-add-note');
  const noteInput = document.getElementById('playground-note');

  if (plusButton) {
    plusButton.addEventListener('click', () => {
      state.playground.counter += 1;
      saveAppState(state);
      render(state);
    });
  }

  if (minusButton) {
    minusButton.addEventListener('click', () => {
      state.playground.counter -= 1;
      saveAppState(state);
      render(state);
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      const fresh = resetAppState();
      state.student = fresh.student;
      state.studio = structuredClone(fresh.studio);
      state.playground = structuredClone(fresh.playground);
      saveAppState(state);
      render(state);
    });
  }

  if (addNoteButton && noteInput) {
    addNoteButton.addEventListener('click', () => {
      const value = noteInput.value.trim();
      if (!value) return;

      state.playground.notes.unshift(value);
      noteInput.value = '';
      saveAppState(state);
      render(state);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const state = loadPlaygroundState(loadAppState());
  saveAppState(state);
  render(state);
  wireButtons(state);
});