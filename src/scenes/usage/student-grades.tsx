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
	yield* code().code.append('student_id = ⋯', 1);
	yield* waitForSlide('id');
	yield* code().code.append('\nwith connect() as conn:', 1);
	yield* waitForSlide('conn');
	yield* code().code.append('\n  with conn.cursor() as cur:', 1);
	yield* waitForSlide('cur');
	const execute = Code.createSignal('');
	yield* code().code.append(CODE`\n    cur.execute(${execute}\n    )`, 1);
	const projection = Code.createSignal('⋯');
	const sql = Code.createSignal(CODE`SELECT ${projection}`);
	yield* execute.append(CODE`\n      """${sql}\n      """,`, 1);
	yield* waitForSlide('select');
	const tables = Code.createSignal('Study as s');
	yield* sql.append(CODE`\n         FROM ${tables}`, 1);
	yield* waitForSlide('from');
	yield* all(
		sql.append('\n         WHERE s.student_id = %s', 1),
		execute.append('\n      [student_id],', 1),
	);
	yield* waitForSlide('where');
	yield* tables.append(
		'\n         INNER JOIN CourseGroup as cg\n         ON cg.id = s.course_group_id',
		1,
	);
	yield* waitForSlide('cg');
	yield* tables.append(
		'\n         INNER JOIN Course as c\n         ON c.id = cg.course_id',
		1,
	);
	yield* waitForSlide('c');
	yield* projection(
		's.grade, c.name, cg.term,\n(c.theoretical_units + c.practical_units) as units',
		1,
	);
	yield* waitForSlide('project');
	yield* code().code.append('\n    grades_of_user = cur.fetchall()', 1);
	yield* waitForSlide('result');
	finishScene();
});
