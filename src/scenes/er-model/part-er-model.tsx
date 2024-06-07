import {makeScene2D} from '@motion-canvas/2d';
import {finishScene} from '@motion-canvas/core';
import {PartHeading} from '../../components/PartHeading.js';
import {actuallyFadeTransition, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	view.add(<PartHeading number={1} titleFa="مدل ER" titleEn="ER Model" />);

	yield* actuallyFadeTransition(2);
	yield* waitForSlide('er-model', 2);
	finishScene();
});
