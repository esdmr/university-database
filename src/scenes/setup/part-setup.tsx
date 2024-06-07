import {makeScene2D} from '@motion-canvas/2d';
import {finishScene, waitFor} from '@motion-canvas/core';
import {PartHeading} from '../../components/PartHeading.js';
import {actuallyFadeTransition, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	view.add(
		<PartHeading
			number={4}
			titleFa="راه‌اندازی پایگاه داده"
			titleEn="Setting the DB up"
		/>,
	);

	yield* actuallyFadeTransition(2);
	yield* waitForSlide('setup', 2);
	finishScene();
});
