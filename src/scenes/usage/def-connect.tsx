import {makeScene2D, Code, CODE} from '@motion-canvas/2d';
import {
	Direction,
	createRef,
	finishScene,
	slideTransition,
	waitFor,
} from '@motion-canvas/core';
import {CodeBlock} from '../../components/CodeBlock.js';
import {Text} from '../../components/Text.js';
import {python} from '../../highlighters.js';
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
				highlighter={python}
				code=""
			/>
		</>,
	);

	yield* slideTransition(Direction.Right);
	yield* code().code.append('import pymysql', 1);
	yield* code().code.append('\n\ndef connect() -> pymysql.Connection:', 1);
	const auth = Code.createSignal('');
	yield* code().code.append(CODE`\n  return pymysql.connect(${auth}\n  )`, 1);
	yield* waitForSlide('return', 6.76);
	yield* auth.append('\n    host="localhost",', 0.5);
	yield* auth.append('\n    port=3306,', 0.5);
	yield* auth.append('\n    user="root",', 0.5);
	yield* auth.append('\n    password="root",', 0.5);
	yield* auth.append('\n    database="university",', 0.5);
	yield* auth.append('\n    autocommit=True,', 0.5);
	yield* waitForSlide('auth', 9.72);
	finishScene();
});
