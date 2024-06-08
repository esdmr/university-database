import {Node, makeScene2D} from '@motion-canvas/2d';
import {
	Direction,
	finishScene,
	slideTransition,
	waitFor,
} from '@motion-canvas/core';
import {Attribute} from '../../components/Attribute.js';
import {Edge} from '../../components/Edge.js';
import {Entity} from '../../components/Entity.js';
import {createGraph, reveal, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	const $ = createGraph();

	view.add(
		<Node position={() => view.middle().flipped}>
			<Edge
				ref={$.edges.id}
				start={() => $.vertices.courseGroup().top()}
				end={() => $.attributes.id().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.term}
				start={() => $.vertices.courseGroup().top()}
				end={() => $.attributes.term().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.class}
				start={() => $.vertices.courseGroup().top()}
				end={() => $.attributes.class().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.timeSlot}
				start={() => $.vertices.courseGroup().bottom()}
				end={() => $.attributes.timeSlot().top()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.dow}
				start={() => $.attributes.timeSlot().bottom()}
				end={() => $.attributes.dow().top()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.start}
				start={() => $.attributes.timeSlot().bottom()}
				end={() => $.attributes.start().top()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.end}
				start={() => $.attributes.timeSlot().bottom()}
				end={() => $.attributes.end().top()}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.courseGroup}
				nameFa="گروه درسی"
				nameEn="Course Group"
				position={() => view.middle()}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.id}
				nameFa="شناسه"
				nameEn="ID"
				type="integer"
				underline
				position={() => view.middle().add([-550, -200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.term}
				nameFa="ترم"
				nameEn="Term"
				type="integer"
				position={() => view.middle().add([0, -200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.class}
				nameFa="کلاس"
				nameEn="Class"
				type="integer"
				position={() => view.middle().add([550, -200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.timeSlot}
				nameFa="بازهٔ زمانی"
				nameEn="Time Slot"
				position={() => view.middle().add([0, 200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.dow}
				nameFa="روز هفته"
				nameEn="Day of Week"
				type="integer"
				position={() => $.attributes.timeSlot().position().add([-550, 200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.start}
				nameFa="آغاز"
				nameEn="Start"
				type="time"
				position={() => $.attributes.timeSlot().position().add([0, 200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.end}
				nameFa="پایان"
				nameEn="End"
				type="time"
				position={() => $.attributes.timeSlot().position().add([550, 200])}
				opacity={0}
			/>
		</Node>,
	);

	yield* slideTransition(Direction.Right);

	yield* reveal($.vertices.courseGroup);
	yield* waitForSlide('course-group', 2.42);
	yield* reveal([$.attributes.id, $.edges.id]);
	yield* waitForSlide('id', 2.83);
	yield* reveal([$.attributes.term, $.edges.term]);
	yield* waitForSlide('term', 1.46);
	yield* reveal([$.attributes.class, $.edges.class]);
	yield* waitForSlide('class', 1.29);
	yield* reveal([$.attributes.timeSlot, $.edges.timeSlot]);
	yield* reveal([$.attributes.dow, $.edges.dow]);
	yield* reveal([$.attributes.start, $.edges.start]);
	yield* reveal([$.attributes.end, $.edges.end]);
	yield* waitForSlide('timeSlot', 7.39);

	finishScene();
});
