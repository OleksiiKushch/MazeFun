import { drawMap } from './scripts/entity/map.js';
import { createVirtualControlPanelUI } from './scripts/ui/virtual-control-panel.js';
import { createGameInfoUI } from './scripts/ui/game-info.js';
import { registerControls } from './scripts/control/control.js';

drawMap();
createVirtualControlPanelUI();
createGameInfoUI();
registerControls();
