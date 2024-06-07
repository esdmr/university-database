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
				code="~ $ "
			/>
		</>,
	);

	yield* slideTransition(Direction.Right);
	yield* simulateTyping(code().code, 'cd university_database');
	yield* waitForSlide('cd');
	yield* appendTerminal(code().code, '\n\n~/university_database $ ', 0.5);
	yield* simulateTyping(code().code, 'docker compose up -d');
	yield* waitForSlide('compose');
	yield* appendTerminal(
		code().code,
		'\n\nCreating network "university_database_default"\nwith the default driver',
		1,
	);
	yield* waitFor(1);
	yield* appendTerminal(code().code, '\nCreating university_database_db_1…', 1);
	yield* waitFor(1);
	yield* appendTerminal(code().code, ' done', 1);
	yield* appendTerminal(code().code, '\n\n~/university_database $ ', 0.5);
	finishScene();
});
