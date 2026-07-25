import { loadAppState, saveAppState, resetAppState, setLastPage } from './app.js';

function bootstrapHome() {
  const state = loadAppState();
  setLastPage(state, 'home');
}

function bootstrapAcademy() {
  const state = loadAppState();
  setLastPage(state, 'academy');
}

function bootstrapStudio() {
  const state = loadAppState();
  setLastPage(state, 'studio');
}

function bootstrapPlayground() {
  const state = loadAppState();
  setLastPage(state, 'playground');
}

function initialize() {
  const page = document.body.dataset.page;

  if (page === 'home') bootstrapHome();
  if (page === 'academy') bootstrapAcademy();
  if (page === 'studio') bootstrapStudio();
  if (page === 'playground') bootstrapPlayground();

  window.GEI = {
    loadAppState,
    saveAppState,
    resetAppState,
  };
}

document.addEventListener('DOMContentLoaded', initialize);