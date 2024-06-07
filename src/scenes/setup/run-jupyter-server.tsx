import {makeScene2D, type Code} from '@motion-canvas/2d';
import {
	Direction,
	createRef,
	finishScene,
	slideTransition,
	waitFor,
} from '@motion-canvas/core';
import {CodeBlock} from '../../components/CodeBlock.js';
import {Text} from '../../components/Text.js';
import {
	appendTerminal,
	pointAt,
	simulateTyping,
	waitForSlide,
} from '../../utils.js';

export default makeScene2D(function* (view) {
	const code = createRef<Code>();

	view.add(
		<>
			<Text
				position={() =>
					pointAt(
						code().position(),
						code().cacheBBox().size,
						Direction.Top,
					).addY(-64)
				}
				textEn="Terminal"
			/>
			<CodeBlock
				ref={code}
				y={32}
				minWidth={1450}
				fill="#181818"
				highlighter={null}
				code="~/university_database $ "
			/>
		</>,
	);

	yield* slideTransition(Direction.Right);
	yield* simulateTyping(code().code, 'pdm run jupyter lab');
	yield* waitForSlide('jupyter');
	yield* appendTerminal(
		code().code,
		'\n\nServing notebooks from local directory:\n/home/user/university_database',
		1,
	);
	yield* waitFor(0.5);
	yield* appendTerminal(
		code().code,
		'\n\nJupyter Server 2.13.0 is running at:',
		1,
	);
	yield* appendTerminal(
		code().code,
		'\n  http://localhost:8888/lab?token=⋯',
		0.5,
	);
	yield* appendTerminal(
		code().code,
		'\n  http://127.0.0.1:8888/lab?token=⋯',
		0.5,
	);
	yield* waitFor(1);
	yield* appendTerminal(
		code().code,
		'\n\nUse Control-C to stop this server and shut down\nall kernels (twice to skip confirmation).',
		1,
	);
	yield* waitForSlide('output');
	finishScene();
});
