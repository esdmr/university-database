import {CODE, Code, makeScene2D} from '@motion-canvas/2d';
import {
	Direction,
	all,
	createRef,
	delay,
	finishScene,
	slideTransition,
	waitFor,
} from '@motion-canvas/core';
import {yaml} from '../../highlighters.js';
import {CodeBlock} from '../../components/CodeBlock.js';
import {Text} from '../../components/Text.js';
import {pointAt, waitForSlide} from '../../utils.js';

export default makeScene2D(function* (view) {
	const code = createRef<Code>();
	const service = Code.createSignal('');
	const topLevel = Code.createSignal('');

	view.add(
		<>
			<Text
				position={() =>
					pointAt(
						code().position(),
						code().cacheBBox().size,
						Direction.Top,
					).addY(-64)
				}
				fontFamily="Code"
				textEn="docker-compose.yaml"
			/>
			<CodeBlock
				ref={code}
				y={32}
				minWidth={1450}
				fill="#181818"
				highlighter={yaml}
				code={CODE`services:\n  db:${service}${topLevel}`}
			/>
		</>,
	);

	yield* slideTransition(Direction.Right);
	yield* waitForSlide('service');

	yield* service.append('\n    image: mariadb', 1);
	yield* waitForSlide('image');
	yield* service.append('\n    ports:\n      - 3306:3306', 1);
	yield* waitForSlide('ports');

	yield* all(
		service.append('\n    volumes:\n      - dbdata:/var/lib/mysql', 1),
		topLevel.append('\n\nvolumes:\n  dbdata:', 1),
	);

	yield* waitForSlide('volumes');
	yield* service.append('\n    restart: always', 1);
	yield* waitForSlide('restart');
	yield* service.append('\n    environment:', 1);
	yield* service.append('\n      MYSQL_ROOT_PASSWORD: root', 1);
	yield* service.append('\n      MYSQL_USER: user', 1);
	yield* service.append('\n      MYSQL_PASSWORD: pass', 1);
	yield* service.append('\n      MYSQL_DATABASE: university', 1);
	yield* waitForSlide('envs');
	finishScene();
});
