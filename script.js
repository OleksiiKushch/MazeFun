import { drawMap } from './scripts/entity/map.js';
import { createGameInfoUI } from './scripts/ui/game-info.js';
import { registerControls } from './scripts/control/control.js';

createGameInfoUI();
drawMap();
registerControls();
