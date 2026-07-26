// =========================================
// GEI OBSERVATION ENGINE
// =========================================

const OBSERVATION_STORAGE_KEY =
  'gei-observation-mission-1';


export function saveObservations(
  observations
) {
  localStorage.setItem(
    OBSERVATION_STORAGE_KEY,
    JSON.stringify(
      observations
    )
  );
}


export function loadObservations() {
  const saved =
    localStorage.getItem(
      OBSERVATION_STORAGE_KEY
    );

  if (!saved) {
    return [
      '',
      '',
      '',
    ];
  }

  try {
    return JSON.parse(
      saved
    );
  } catch {
    return [
      '',
      '',
      '',
    ];
  }
}


export function validateObservations(
  observations
) {
  return observations.every(
    (observation) =>
      observation.trim().length >= 5
  );
}


export function getObservationCount(
  observations
) {
  return observations.filter(
    (observation) =>
      observation.trim().length > 0
  ).length;
}