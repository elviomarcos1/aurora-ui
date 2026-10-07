const { createCjsPreset } = require('jest-preset-angular/presets');

/** @type {import('jest').Config} */
module.exports = {
  ...createCjsPreset(),
  displayName: 'aurora-ui',
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
