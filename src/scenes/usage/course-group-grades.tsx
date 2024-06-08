import {CODE, Code, makeScene2D} from '@motion-canvas/2d';
import {
	Direction,
	all,
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
	yield* code().code.append('course_group_id = ⋯', 1);
	yield* waitForSlide('id', 3.48);
	yield* code().code.append('\nwith connect() as conn:', 1);
	yield* waitForSlide('conn', 1.75);
	yield* code().code.append('\n  with conn.cursor() as cur:', 1);
	yield* waitForSlide('cur', 1.87);

	const execute = Code.createSignal('');
	yield* code().code.append(CODE`\n    cur.execute(${execute}\n    )`, 1);
	const projection = Code.createSignal('⋯');
	const sql = Code.createSignal(CODE`SELECT ${projection}`);
	yield* execute.append(CODE`\n      """${sql}\n      """,`, 1);
	yield* waitForSlide('select', 2.42);
	const tables = Code.createSignal('Study as s');
	yield* sql.append(CODE`\n         FROM ${tables}`, 1);
	yield* waitForSlide('from', 2.3);
	yield* all(
		sql.append('\n         WHERE s.course_group_id = %s', 1),
		execute.append('\n      [course_group_id],', 1),
	);
	yield* waitForSlide('where', 3.45);
	yield* tables.append(
		'\n         INNER JOIN Student as st\n         ON st.id = s.student_id',
		1,
	);
	yield* waitForSlide('student', 5.73);
	yield* projection('s.grade, st.f_name, st.l_name', 1);
	yield* waitForSlide('project', 4.32);
	yield* code().code.append('\n    grades_of_course_group = cur.fetchall()', 1);
	yield* waitForSlide('result', 2.52);
	finishScene();
});
