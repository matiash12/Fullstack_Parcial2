// src/tests.js

import jasmineDom from '@testing-library/jasmine-dom';

beforeAll(() => {
  jasmine.addMatchers(jasmineDom);
});

const context = require.context('./', true, /\.spec\.js$/);
context.keys().forEach(context);