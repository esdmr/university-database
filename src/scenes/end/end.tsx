import {makeScene2D} from '@motion-canvas/2d';
import {finishScene} from '@motion-canvas/core';
import {Text} from '../../components/Text.js';
import {actuallyFadeTransition, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	view.add(
		<Text fontSize={192} fill="#241527" textFa="پایان" textEn="The End" />,
	);

	yield* actuallyFadeTransition(2);
	yield* waitForSlide('end', 2);
	finishScene();
});
