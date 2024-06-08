import {makeScene2D, type Code, lines} from '@motion-canvas/2d';
import {
	Direction,
	all,
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
	yield* code().code.append(
		'c_dept = insert("Department", name="Computer")',
		1,
	);
	yield* waitForSlide('dept', 6.31);
	yield* code().code.append(
		'\n\nce_maj = insert("Major",\n  name="Computer Engineering",\n  department_id=c_dept)',
		1,
	);
	yield* waitForSlide('major', 2.88);
	yield* code().code.append(
		'\n\nds_crs = insert("Course", name="Data Structures",\n  theoretical_units=3, practical_units=0)',
		1,
	);
	yield* waitForSlide('course', 4.56);
	yield* code().code.append(
		'\n\njt_prof = insert("Professor", f_name="Jake",\n  l_name="Taylor", address="Some address idk",\n  title="Computer Professor",\n  phone="009898989898", birth=date(1980, 2, 5),\n  email="vip@prof.co.uk", gender="M", office=3)',
		1,
	);
	yield* waitForSlide('prof', 3.67);
	yield* all(
		code().code.replace(
			[
				[0, 9],
				[1, Number.POSITIVE_INFINITY],
			],
			'⋯\n',
			1,
		),
		code().code.replace(
			[
				[2, 9],
				[5, Number.POSITIVE_INFINITY],
			],
			'⋯\n',
			1,
		),
		code().code.replace(
			[
				[6, 9],
				[8, Number.POSITIVE_INFINITY],
			],
			'⋯\n',
			1,
		),
		code().code.replace(
			[
				[9, 10],
				[14, Number.POSITIVE_INFINITY],
			],
			'⋯',
			1,
		),
	);
	yield* waitFor(1);
	yield* code().code.append(
		'\n\naa_stu = insert("Student", f_name="Ahmed",\n  l_name="Adams", address="Other address idk",\n  phone="001847362152", birth=date(2004, 12, 7),\n  email="rando@gmail.com", gender="M",\n  first_term=3)',
		1,
	);
	yield* waitForSlide('student', 3.33);
	yield* code().code.append(
		'\n\naa_enr = insert("Enrollment",\n  student_id=aa_stud, major_id=ce_maj)',
		1,
	);
	yield* waitForSlide('enrollment', 3.31);
	yield* all(
		code().code.remove(lines(4), 1),
		code().code.replace(
			[
				[5, 9],
				[10, Number.POSITIVE_INFINITY],
			],
			'⋯\n',
			1,
		),
		code().code.replace(
			[
				[11, 9],
				[12, Number.POSITIVE_INFINITY],
			],
			'⋯',
			1,
		),
	);
	yield* waitFor(1);
	yield* code().code.append(
		'\n\nds_cg = insert("CourseGroup", term=4,\n  classroom=120, start_time=time(10, 0, 0),\n  end_time=time(12, 0, 0), professor_id=jt_prof,\n  week_day=2, course_id=ds_crs)',
		1,
	);
	yield* waitForSlide('course-group', 5.35);
	yield* code().code.append(
		'\n\naa_ds_stu = insert("Study", student_id=aa_stu,\n  course_group_id=ds_cg, grade=18.25)',
		1,
	);
	yield* waitForSlide('study', 4.17);
	finishScene();
});
