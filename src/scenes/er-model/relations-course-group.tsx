import {Node, makeScene2D} from '@motion-canvas/2d';
import {
	Direction,
	Vector2,
	finishScene,
	slideTransition,
	waitFor,
} from '@motion-canvas/core';
import {Edge} from '../../components/Edge.js';
import {Entity} from '../../components/Entity.js';
import {Relation} from '../../components/Relation.js';
import {createGraph, reveal, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	const $ = createGraph();

	view.add(
		<Node position={() => view.middle().flipped}>
			<Node ref={$.nodes.studies} opacity={0}>
				<Edge
					start={() => $.vertices.student().left()}
					end={() => $.vertices.studies().right()}
					horizontal
					multiplicity="M"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Top)}
				/>
				<Edge
					start={() => $.vertices.studies().left()}
					end={() => $.vertices.courseGroup().right()}
					horizontal
					multiplicity="N"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Top)}
				/>
			</Node>
			<Node ref={$.nodes.teaches} opacity={0}>
				<Edge
					start={() => $.vertices.professor().bottom()}
					end={() => $.vertices.teaches().top()}
					multiplicity="1"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Left)}
				/>
				<Edge
					start={() => $.vertices.teaches().bottom()}
					end={() => $.vertices.courseGroup().top()}
					multiplicity="N"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Left)}
				/>
			</Node>
			<Node ref={$.nodes.implements} opacity={0}>
				<Edge
					start={() => $.vertices.course().right()}
					end={() => $.vertices.implements().left()}
					horizontal
					multiplicity="1"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Top)}
				/>
				<Edge
					start={() => $.vertices.implements().right()}
					end={() => $.vertices.courseGroup().left()}
					horizontal
					multiplicity="N"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Top)}
				/>
			</Node>
			<Entity
				ref={$.vertices.student}
				nameFa="دانشجو"
				nameEn="Student"
				position={() => view.right().add([-200, 200])}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.professor}
				nameFa="استاد"
				nameEn="Professor"
				position={() => view.top().add([0, 200])}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.course}
				nameFa="درس"
				nameEn="Course"
				position={() => view.left().add([200, 200])}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.courseGroup}
				nameFa="گروه درسی"
				nameEn="Course Group"
				position={() => view.middle().add([0, 200])}
				opacity={0}
			/>
			<Relation
				ref={$.vertices.studies}
				nameFa="درس می‌خواند"
				nameEn="Studies"
				position={() =>
					Vector2.lerp(
						$.vertices.student().left(),
						$.vertices.courseGroup().right(),
						0.5,
					)
				}
				opacity={0}
			/>
			<Relation
				ref={$.vertices.teaches}
				nameFa="درس می‌دهد"
				nameEn="Teaches"
				position={() =>
					Vector2.lerp(
						$.vertices.professor().bottom(),
						$.vertices.courseGroup().top(),
						0.5,
					)
				}
				opacity={0}
			/>
			<Relation
				ref={$.vertices.implements}
				nameFa="تعبیه می‌کند"
				nameEn="Implements"
				position={() =>
					Vector2.lerp(
						$.vertices.course().right(),
						$.vertices.courseGroup().left(),
						0.5,
					)
				}
				opacity={0}
			/>
		</Node>,
	);

	yield* slideTransition(Direction.Right);
	yield* reveal($.vertices.courseGroup);
	yield* waitForSlide('cg');
	yield* reveal($.vertices.course);
	yield* reveal([$.vertices.implements, $.nodes.implements]);
	yield* waitForSlide('c');
	yield* reveal($.vertices.professor);
	yield* reveal([$.vertices.teaches, $.nodes.teaches]);
	yield* waitForSlide('p');
	yield* reveal($.vertices.student);
	yield* reveal([$.vertices.studies, $.nodes.studies]);
	yield* waitForSlide('s');

	finishScene();
});
