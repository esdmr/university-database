import {type FullSceneDescription} from '@motion-canvas/core';
import attributesCourseGroup from './attributes-course-group.js?scene';
import attributesPersonSubclasses from './attributes-person-subclasses.js?scene';
import attributesPerson from './attributes-person.js?scene';
import attributesStudentStudies from './attributes-student-studies.js?scene';
import partErModel from './part-er-model.js?scene';
import relationsCourseGroup from './relations-course-group.js?scene';
import relationsMajor from './relations-major.js?scene';

export const erModelScenes: FullSceneDescription[] = [
	partErModel,
	relationsCourseGroup,
	relationsMajor,
	attributesPerson,
	attributesPersonSubclasses,
	attributesCourseGroup,
	attributesStudentStudies,
];
