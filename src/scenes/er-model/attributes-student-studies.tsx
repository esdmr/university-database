import {Node, makeScene2D} from '@motion-canvas/2d';
import {
	Direction,
	Vector2,
	finishScene,
	slideTransition,
	waitFor,
} from '@motion-canvas/core';
import {Attribute} from '../../components/Attribute.js';
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
			<Edge
				ref={$.edges.grade}
				start={() => $.vertices.studies().bottom()}
				end={() => $.attributes.grade().top()}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.student}
				nameFa="دانشجو"
				nameEn="Student"
				position={() => view.right().add([-450, 0])}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.courseGroup}
				nameFa="گروه درسی"
				nameEn="Course Group"
				position={() => view.left().add([450, 0])}
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
			<Attribute
				ref={$.attributes.grade}
				nameFa="نمره"
				nameEn="Grade"
				type="decimal"
				position={() => $.vertices.studies().position().add([0, 300])}
				opacity={0}
			/>
		</Node>,
	);

	yield* slideTransition(Direction.Right);

	yield* reveal([$.vertices.courseGroup, $.vertices.student]);
	yield* reveal([$.vertices.studies, $.nodes.studies]);
	yield* reveal([$.attributes.grade, $.edges.grade]);
	yield* waitForSlide('p', 3.38);

	finishScene();
});
