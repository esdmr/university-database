import {type FullSceneDescription} from '@motion-canvas/core';
import directoryStructure from './directory-structure.js?scene';
import dockerComposeCommand from './docker-compose-command.js?scene';
import dockerComposeFile from './docker-compose-file.js?scene';
import dockerLogo from './docker-logo.js?scene';
import dockerMirrors from './docker-mirrors.js?scene';
import partInstallMariadb from './part-install-mariadb.js?scene';

export const installMariadbScenes: FullSceneDescription[] = [
	partInstallMariadb,
	dockerLogo,
	dockerMirrors,
	directoryStructure,
	dockerComposeFile,
	dockerComposeCommand,
];
