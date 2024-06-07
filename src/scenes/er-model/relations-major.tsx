import {Node, makeScene2D} from '@motion-canvas/2d';
import {
	Direction,
	Vector2,
	finishScene,
	slideTransition,
} from '@motion-canvas/core';
import {Edge} from '../../components/Edge.js';
import {Entity} from '../../components/Entity.js';
import {Relation} from '../../components/Relation.js';
import {createGraph, reveal, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	const $ = createGraph();

	view.add(
		<Node position={() => view.middle().flipped}>
			<Node ref={$.nodes.offers} opacity={0}>
				<Edge
					start={() => $.vertices.department().bottom()}
					end={() => $.vertices.offers().top()}
					multiplicity="1"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Left)}
				/>
				<Edge
					start={() => $.vertices.offers().bottom()}
					end={() => $.vertices.major().top()}
					multiplicity="N"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Left)}
				/>
			</Node>
			<Node ref={$.nodes.majors} opacity={0}>
				<Edge
					start={() => $.vertices.student().top()}
					end={() => $.vertices.majors().bottom()}
					multiplicity="M"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Left)}
				/>
				<Edge
					start={() => $.vertices.majors().top()}
					end={() => $.vertices.major().bottom()}
					multiplicity="N"
					multiplicityAnchor={Vector2.fromOrigin(Direction.Left)}
				/>
			</Node>
			<Entity
				ref={$.vertices.department}
				nameFa="دپارتمان"
				nameEn="Department"
				position={() => view.top().add([0, 150])}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.major}
				nameFa="رشته"
				nameEn="Major"
				position={view.middle}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.student}
				nameFa="دانشجو"
				nameEn="Student"
				position={() => view.bottom().add([0, -150])}
				opacity={0}
			/>
			<Relation
				ref={$.vertices.offers}
				nameFa="ارائه می‌دهد"
				nameEn="Offers"
				position={() =>
					Vector2.lerp(
						$.vertices.department().position(),
						$.vertices.major().position(),
						0.5,
					)
				}
				opacity={0}
			/>
			<Relation
				ref={$.vertices.majors}
				nameFa="تحصیل می‌کند"
				nameEn="Majors"
				position={() =>
					Vector2.lerp(
						$.vertices.student().position(),
						$.vertices.major().position(),
						0.5,
					)
				}
				opacity={0}
			/>
		</Node>,
	);

	yield* slideTransition(Direction.Right);
	yield* reveal($.vertices.department);
	yield* waitForSlide('d');
	yield* reveal($.vertices.major);
	yield* reveal([$.vertices.offers, $.nodes.offers]);
	yield* waitForSlide('m');
	yield* reveal($.vertices.student);
	yield* reveal([$.vertices.majors, $.nodes.majors]);
	yield* waitForSlide('s');

	finishScene();
});
