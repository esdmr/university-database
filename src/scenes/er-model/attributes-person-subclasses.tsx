import {Node, makeScene2D} from '@motion-canvas/2d';
import {Direction, finishScene, slideTransition} from '@motion-canvas/core';
import {Attribute} from '../../components/Attribute.js';
import {Edge} from '../../components/Edge.js';
import {Entity} from '../../components/Entity.js';
import {Vertex, VertexShape} from '../../components/Vertex.js';
import {createGraph, reveal, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	const $ = createGraph();

	view.add(
		<Node position={() => view.middle().flipped}>
			<Edge
				ref={$.edges.is}
				start={() => $.vertices.is().top()}
				end={() => $.vertices.person().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.student}
				start={() => $.vertices.student().top()}
				end={() => $.vertices.is().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.firstTerm}
				start={() => $.vertices.student().bottom()}
				end={() => $.attributes.firstTerm().top()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.professor}
				start={() => $.vertices.professor().top()}
				end={() => $.vertices.is().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.title}
				start={() => $.vertices.professor().bottom()}
				end={() => $.attributes.title().top()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.office}
				start={() => $.vertices.professor().bottom()}
				end={() => $.attributes.office().top()}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.person}
				nameFa="فرد"
				nameEn="Person"
				position={() => view.middle().add([0, -400])}
				opacity={0}
			/>
			<Vertex
				ref={$.vertices.is}
				nameEn="o"
				shape={VertexShape.Circle}
				position={() => view.middle().add([0, -200])}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.student}
				nameFa="دانشجو"
				nameEn="Student"
				position={() => view.middle().add([400, 0])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.firstTerm}
				nameFa="ترم اول"
				nameEn="First Term"
				type="integer"
				position={() => $.vertices.student().bottom().add([0, 200])}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.professor}
				nameFa="استاد"
				nameEn="Professor"
				position={() => view.middle().add([-400, 0])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.title}
				nameFa="مقام"
				nameEn="Title"
				type="string"
				position={() => $.vertices.professor().bottom().add([-250, 200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.office}
				nameFa="شماره دفتر"
				nameEn="Office Number"
				type="integer"
				position={() => $.vertices.professor().bottom().add([250, 200])}
				opacity={0}
			/>
		</Node>,
	);

	$.edges.is().curve().endArrow(true);

	yield* slideTransition(Direction.Right);

	yield* reveal($.vertices.person);
	yield* reveal([$.vertices.is, $.edges.is]);
	yield* waitForSlide('is', 3.62);
	yield* reveal([$.vertices.student, $.edges.student]);
	yield* reveal([$.attributes.firstTerm, $.edges.firstTerm]);
	yield* waitForSlide('student', 6.72);
	yield* reveal([$.vertices.professor, $.edges.professor]);
	yield* reveal([$.attributes.title, $.edges.title]);
	yield* reveal([$.attributes.office, $.edges.office]);
	yield* waitForSlide('professor', 4.36);

	finishScene();
});
