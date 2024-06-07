import {makeScene2D, type Code} from '@motion-canvas/2d';
import {
	Direction,
	createRef,
	finishScene,
	slideTransition,
} from '@motion-canvas/core';
import {CodeBlock} from '../../components/CodeBlock.js';
import {Text} from '../../components/Text.js';
import {sql} from '../../highlighters.js';
import {pointAt, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	const label = createRef<Text>();
	const code = createRef<Code>();

	view.add(
		<>
			<Text
				ref={label}
				position={() =>
					pointAt(
						code().position(),
						code().cacheBBox().size,
						Direction.Top,
					).addY(-64)
				}
				textEn="Jupyter Notebook"
			/>
			<CodeBlock
				ref={code}
				y={32}
				minWidth={1450}
				fill="#181818"
				highlighter={sql}
				code="%%sql"
			/>
		</>,
	);

	yield* slideTransition(Direction.Right);
	yield* code().code.append('\nDROP DATABASE IF EXISTS university;', 1);
	yield* code().code.append('\nCREATE DATABASE university;', 1);
	yield* waitForSlide('create');
	yield* code().code.append('\nUSE university;', 1);
	yield* waitForSlide('use');
	finishScene();
});
