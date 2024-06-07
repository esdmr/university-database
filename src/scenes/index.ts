import {type FullSceneDescription} from '@motion-canvas/core';
import {endScenes} from './end/index.js';
import {erModelScenes} from './er-model/index.js';
import {installMariadbScenes} from './install-mariadb/index.js';
import {installPackagesScenes} from './install-packages/index.js';
import {setupScenes} from './setup/index.js';
import {titleScenes} from './title/index.js';
import {usageScenes} from './usage/index.js';

export const scenes: FullSceneDescription[] = [
	titleScenes,
	erModelScenes,
	installMariadbScenes,
	installPackagesScenes,
	setupScenes,
	usageScenes,
	endScenes,
].flat();
