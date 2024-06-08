import {makeScene2D, type Code} from '@motion-canvas/2d';
import {
	Direction,
	createRef,
	finishScene,
	slideTransition,
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
	yield* code().code.append('def insert(table: str, **kw) -> int:', 1);
	yield* waitForSlide('insert', 4.24);
	yield* code().code.append('\n  with connect() as conn:', 1);
	yield* waitForSlide('conn', 1.99);
	yield* code().code.append('\n    with conn.cursor() as cur:', 1);
	yield* waitForSlide('cur', 2.13);
	yield* code().code.append('\n      column_names = ", ".join(kw.keys())', 1);
	yield* waitForSlide('col', 2.01);
	yield* code().code.append(
		'\n      placeholders = ", ".join(["%s" for _ in kw])',
		1,
	);
	yield* waitForSlide('ph', 10.77);
	yield* code().code.append('\n      cur.execute(\n      )', 1);
	yield* waitForSlide('execute', 2.78);
	yield* code().code.insert(
		[6, 0],
		'        f"""INSERT INTO {table}({column_names})\n            VALUE ({placeholders})\n         """,\n',
		1,
	);
	yield* waitForSlide('insert', 5.92);
	yield* code().code.insert([9, 0], '        list(kw.values()),\n', 1);
	yield* waitForSlide('args', 5.16);
	yield* code().code.append('\n      return cur.lastrowid', 1);
	yield* waitForSlide('id', 6.28);
	finishScene();
});
