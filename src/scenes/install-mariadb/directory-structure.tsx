import {Line, makeScene2D, Node} from '@motion-canvas/2d';
import {
	all,
	createRef,
	delay,
	Direction,
	finishScene,
	slideTransition,
} from '@motion-canvas/core';
import {File} from '../../components/File.js';
import {Folder} from '../../components/Folder.js';
import {Text} from '../../components/Text.js';
import {waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	const folder = createRef<Node>();
	const file = createRef<Node>();
	const line = createRef<Line>();

	view.add(
		<>
			<Node ref={folder} position={[-300, -100]}>
				<Folder fill="#181818" scale={8} />
				<Text
					position={[480, 96]}
					fontFamily="Code"
					textEn="university_database"
				/>
			</Node>
			<Node ref={file} position={[-300, -100]} opacity={0}>
				<File fill="#181818" scale={8} />
				<Text
					position={[480, 96]}
					fontFamily="Code"
					textEn="docker-compose.yaml"
				/>
			</Node>
			<Line
				ref={line}
				stroke="#181818"
				lineWidth={16}
				points={[
					() => folder().position().add([96, 192]),
					() => [folder().position().x + 96, file().position().y + 96],
					() => file().position().add([0, 96]),
				]}
				opacity={0}
			/>
		</>,
	);

	yield* slideTransition(Direction.Right);
	yield* waitForSlide('directory', 4.7);
	yield* all(
		folder().position.edit((v) => v.add(-100), 1),
		file().position.edit((v) => v.add(100), 1),
		file().opacity(1, 1),
		delay(0.4, line().opacity(1, 0.6)),
	);
	yield* waitForSlide('compose', 4.34);
	finishScene();
});
