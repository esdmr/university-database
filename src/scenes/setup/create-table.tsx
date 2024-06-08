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

	for (const [tableName, tableColumns, time] of [
		[
			'Student',
			[
				'id         INT PRIMARY KEY AUTO_INCREMENT',
				'f_name     VARCHAR(128)',
				'l_name     VARCHAR(128)',
				'birth      DATE',
				'address    VARCHAR(256)',
				'email      VARCHAR(128)',
				'phone      VARCHAR(14)',
				'gender     CHAR(1)',
				'first_term INT',
			],
			11.28,
		],
		[
			'Professor',
			[
				'id      INT PRIMARY KEY AUTO_INCREMENT',
				'f_name  VARCHAR(128)',
				'l_name  VARCHAR(128)',
				'birth   DATE',
				'address VARCHAR(256)',
				'email   VARCHAR(128)',
				'phone   VARCHAR(14)',
				'gender  CHAR(1)',
				'title   VARCHAR(128)',
				'office  INT',
			],
			1.68,
		],
		[
			'Department',
			['id   INT PRIMARY KEY AUTO_INCREMENT', 'name VARCHAR(128)'],
			3.21,
		],
		[
			'Major',
			[
				'id            INT PRIMARY KEY AUTO_INCREMENT',
				'name          VARCHAR(128)',
				'department_id INT REFERENCES Department (id)',
			],
			4.65,
		],
		[
			'Course',
			[
				'id               INT PRIMARY KEY AUTO_INCREMENT',
				'name              VARCHAR(128)',
				'theoretical_units INT',
				'practical_units   INT',
			],
			3.69,
		],
		[
			'CourseGroup',
			[
				'id           INT PRIMARY KEY AUTO_INCREMENT',
				'term         INT',
				'classroom    INT',
				'week_day     INT',
				'start_time   TIME',
				'end_time     TIME',
				'professor_id INT REFERENCES Professor (id)',
				'course_id    INT REFERENCES Course (id)',
			],
			4.15,
		],
		[
			'Study',
			[
				'id              INT PRIMARY KEY AUTO_INCREMENT',
				'grade           DECIMAL(4, 2)',
				'student_id      INT REFERENCES Student (id)',
				'course_group_id INT REFERENCES CourseGroup (id)',
			],
			4.44,
		],
		[
			'Enrollment',
			[
				'id         INT PRIMARY KEY AUTO_INCREMENT',
				'student_id INT REFERENCES Student (id)',
				'major_id   INT REFERENCES Major (id)',
			],
			3.88,
		],
	] as const) {
		const columns = Code.createSignal('');

		yield* code().code(
			CODE`%%sql\nCREATE TABLE ${tableName}(${columns}\n);`,
			1,
		);

		yield* columns.append(`\n  ${tableColumns[0]}`, 0.5);

		for (const line of tableColumns.slice(1)) {
			yield* columns.append(`,\n  ${line}`, 0.5);
		}

		yield* waitForSlide(tableName, time);
	}

	finishScene();
});
