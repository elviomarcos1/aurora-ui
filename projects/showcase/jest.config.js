import presets from 'jest-preset-angular/presets/index.js';

const { createCjsPreset } = presets;

/** @type {import('jest').Config} */
export default {
  ...createCjsPreset(),
  displayName: 'showcase',
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^@aurora-hospital/ui$': '<rootDir>/../../dist/aurora-ui/fesm2022/aurora-hospital-ui.mjs',
  },
};
