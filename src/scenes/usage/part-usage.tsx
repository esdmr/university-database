import {makeScene2D} from '@motion-canvas/2d';
import {finishScene, waitFor} from '@motion-canvas/core';
import {PartHeading} from '../../components/PartHeading.js';
import {actuallyFadeTransition, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	view.add(
		<PartHeading
			number={5}
			titleFa="استفاده از پایگاه داده"
			titleEn="Using the DB"
		/>,
	);

	yield* actuallyFadeTransition(2);
	yield* waitForSlide('usage', 2);
	finishScene();
});
