import {makeScene2D} from '@motion-canvas/2d';
import {finishScene} from '@motion-canvas/core';
import {Text} from '../../components/Text.js';
import {waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	view.add(
		<Text
			fontSize={192}
			fill="#241527"
			textFa="پایگاه دادهٔ دانشگاه"
			textEn="University Database"
		/>,
	);

	yield* waitForSlide('title', 2);
	finishScene();
});
