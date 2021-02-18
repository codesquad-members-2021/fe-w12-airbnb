export const div = (value, ...classes) =>
  `<div class="${classes.join(' ')}">${value}</div>`;

export const span = (value, ...classes) =>
  `<span class="${classes.join(' ')}">${value}</span>`;
