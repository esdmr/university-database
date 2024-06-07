import {type FullSceneDescription} from '@motion-canvas/core';
import createDb from './create-db.js?scene';
import createTable from './create-table.js?scene';
import loadExtSql from './load-ext-sql.js?scene';
import partSetup from './part-setup.js?scene';
import runJupyterServer from './run-jupyter-server.js?scene';

export const setupScenes: FullSceneDescription[] = [
	partSetup,
	runJupyterServer,
	loadExtSql,
	createDb,
	createTable,
];
