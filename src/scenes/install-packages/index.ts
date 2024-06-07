import {type FullSceneDescription} from '@motion-canvas/core';
import installPdm from './install-pdm.js?scene';
import partInstallPackages from './part-install-packages.js?scene';
import pdmAdd from './pdm-add.js?scene';
import pdmInit from './pdm-init.js?scene';

export const installPackagesScenes: FullSceneDescription[] = [
	partInstallPackages,
	installPdm,
	pdmInit,
	pdmAdd,
];
