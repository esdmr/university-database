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
				start={() => $.vertices.person().top()}
				end={() => $.attributes.id().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.name}
				start={() => $.vertices.person().top()}
				end={() => $.attributes.name().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.firstName}
				start={() => $.attributes.name().top()}
				end={() => $.attributes.firstName().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.lastName}
				start={() => $.attributes.name().top()}
				end={() => $.attributes.lastName().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.dateOfBirth}
				start={() => $.vertices.person().top()}
				end={() => $.attributes.dateOfBirth().bottom()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.address}
				start={() => $.vertices.person().bottom()}
				end={() => $.attributes.address().top()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.email}
				start={() => $.vertices.person().bottom()}
				end={() => $.attributes.email().top()}
				opacity={0}
			/>
			<Edge
				ref={$.edges.phone}
				start={() => $.vertices.person().bottom()}
				end={() => $.attributes.phone().top()}
				opacity={0}
			/>
			<Entity
				ref={$.vertices.person}
				nameFa="فرد"
				nameEn="Person"
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
				ref={$.attributes.name}
				nameFa="نام"
				nameEn="Name"
				type="string"
				position={() => view.middle().add([0, -200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.firstName}
				nameFa="نام کوچک"
				nameEn="First Name"
				type="string"
				position={() => $.attributes.name().position().add([-275, -200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.lastName}
				nameFa="نام خانوادگی"
				nameEn="Last Name"
				type="string"
				position={() => $.attributes.name().position().add([275, -200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.dateOfBirth}
				nameFa="تاریخ تولد"
				nameEn="Date of Birth"
				type="date"
				position={() => view.middle().add([550, -200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.address}
				nameFa="آدرس"
				nameEn="Address"
				type="string"
				position={() => view.middle().add([0, 200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.email}
				nameFa="ایمیل"
				nameEn="Email"
				type="string"
				position={() => view.middle().add([-550, 200])}
				opacity={0}
			/>
			<Attribute
				ref={$.attributes.phone}
				nameFa="شمارهٔ تلفن"
				nameEn="Phone Number"
				type="string"
				position={() => view.middle().add([550, 200])}
				opacity={0}
			/>
		</Node>,
	);

	yield* slideTransition(Direction.Right);

	yield* reveal($.vertices.person);
	yield* waitForSlide('person');
	yield* reveal([$.attributes.id, $.edges.id]);
	yield* waitForSlide('id');
	yield* reveal([$.attributes.email, $.edges.email]);
	yield* waitForSlide('email');
	yield* reveal([$.attributes.address, $.edges.address]);
	yield* waitForSlide('addr');
	yield* reveal([$.attributes.phone, $.edges.phone]);
	yield* waitForSlide('phone');
	yield* reveal([$.attributes.dateOfBirth, $.edges.dateOfBirth]);
	yield* waitForSlide('dob');
	yield* reveal([$.attributes.name, $.edges.name]);
	yield* waitForSlide('name');
	yield* $.attributes.name().type('', 1);
	yield* reveal([$.attributes.firstName, $.edges.firstName]);
	yield* reveal([$.attributes.lastName, $.edges.lastName]);
	yield* waitForSlide('fl-name');

	finishScene();
});
