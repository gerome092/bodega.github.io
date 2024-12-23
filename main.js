import { SafeManager } from './safeManager.js';
import { TimeManager } from './timeManager.js';
import { UIManager } from './uiManager.js';

const safeManager = new SafeManager();
const timeManager = new TimeManager();
const uiManager = new UIManager(safeManager, timeManager);

// Inicializar la aplicación
uiManager.initialize();