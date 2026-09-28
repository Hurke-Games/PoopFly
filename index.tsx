/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Playground } from './playground';
import { CORE_CODE } from './src/game/core';
import { TRANSITIONS_CODE } from './src/game/transitions';
import { FLY_CODE } from './src/game/fly';
import { ENEMIES_CODE } from './src/game/enemies';
import { ENVIRONMENT_CODE } from './src/game/environment';
import { UI_CODE } from './src/game/ui';

const GAME_CODE = [
  CORE_CODE,
  TRANSITIONS_CODE,
  FLY_CODE,
  ENEMIES_CODE,
  ENVIRONMENT_CODE,
  UI_CODE
].join('\n\n');

function initGame() {
  const rootElement = document.querySelector('#root');
  if (!rootElement) return;
  // Prevent duplicate initialization
  if (rootElement.querySelector('gdm-playground')) return;
  const playground = new Playground();
  rootElement.appendChild(playground);
  playground.setCode(GAME_CODE);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
