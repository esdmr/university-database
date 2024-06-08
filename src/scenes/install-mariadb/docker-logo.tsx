import {Img, Rect, makeScene2D} from '@motion-canvas/2d';
import {Direction, finishScene, slideTransition} from '@motion-canvas/core';
import {waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	view.add(
		<Rect layout alignItems="center">
			<Img src="images/docker-logo-blue.png" height={192} margin={96} />
		</Rect>,
	);

	yield* slideTransition(Direction.Right);
	yield* waitForSlide('logo', 12.33);
	finishScene();
});
