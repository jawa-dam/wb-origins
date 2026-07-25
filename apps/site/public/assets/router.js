import {
  initializeHome,
} from './home.js';


async function initialize() {
  const page =
    document.body.dataset.page;


  if (
    page === 'home'
  ) {
    initializeHome();
  }


  if (
    page === 'academy'
  ) {
    await import(
      './academy.js'
    );
  }


  if (
    page === 'studio'
  ) {
    await import(
      './studio.js'
    );
  }


  if (
    page === 'playground'
  ) {
    await import(
      './playground.js'
    );
  }
}


document.addEventListener(
  'DOMContentLoaded',
  initialize
);