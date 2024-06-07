import {makeScene2D} from '@motion-canvas/2d';
import {finishScene} from '@motion-canvas/core';
import {PartHeading} from '../../components/PartHeading.js';
import {actuallyFadeTransition, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	view.add(
		<PartHeading
			number={2}
			titleFa="نصب MariaDB"
			titleEn="Installing MariaDB"
		/>,
	);

	yield* actuallyFadeTransition(2);
	yield* waitForSlide('install-mariadb', 2);
	finishScene();
});
