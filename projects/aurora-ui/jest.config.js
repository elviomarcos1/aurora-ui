import presets from 'jest-preset-angular/presets/index.js';

const { createCjsPreset } = presets;

/** @type {import('jest').Config} */
export default {
  ...createCjsPreset(),
  displayName: 'aurora-ui',
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
