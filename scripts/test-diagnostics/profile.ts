import * as solid from 'solid-js';
import * as signals from '@solidjs/signals';

console.info('__RUNTIME_PROFILE__' + JSON.stringify({
  solidDevelopment: Boolean(solid.DEV),
  signalsDevelopment: Boolean(signals.DEV),
  nodeEnvironment: process.env.NODE_ENV
}));
