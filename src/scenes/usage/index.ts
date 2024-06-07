import {type FullSceneDescription} from '@motion-canvas/core';
import courseGroupGrades from './course-group-grades.js?scene';
import defConnect from './def-connect.js?scene';
import defInsert from './def-insert.js?scene';
import insert from './insert.js?scene';
import partUsage from './part-usage.js?scene';
import studentGrades from './student-grades.js?scene';

export const usageScenes: FullSceneDescription[] = [
	partUsage,
	defConnect,
	defInsert,
	insert,
	studentGrades,
	courseGroupGrades,
];
