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
	clearTerminal,
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
	yield* simulateTyping(code().code, 'pip3 install --user pdm');
	yield* waitForSlide('pdm');
	yield* appendTerminal(code().code, '\n\nCollecting pdm', 1);
	yield* appendTerminal(
		code().code,
		'\n  Downloading pdm-2.15.4.whl.metadata (10 kB)',
		1,
	);
	yield* appendTerminal(
		code().code,
		'\nDownloading pdm-2.15.4.whl (258 kB)',
		1,
	);
	yield* appendTerminal(code().code, '\nInstalling collected packages: pdm', 1);
	yield* appendTerminal(code().code, '\nSuccessfully installed pdm-2.15.4', 1);
	yield* appendTerminal(code().code, '\n\n~/university_database $ ', 1);
	yield* waitFor(0.5);
	yield* clearTerminal(code().code, 1);
	finishScene();
});
