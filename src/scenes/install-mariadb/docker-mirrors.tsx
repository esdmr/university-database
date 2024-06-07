import {Code, makeScene2D, CODE} from '@motion-canvas/2d';
import {
	Direction,
	all,
	createRef,
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
	const insecure = Code.createSignal('');
	const mirrors = Code.createSignal('');

	view.add(
		<>
			<Text
				position={() =>
					pointAt(
						code().position(),
						code().cacheBBox().size,
						Direction.Top,
					).addY(-128)
				}
				fontFamily="Code"
				textEn="C:\ProgramData\docker\config\daemon.json"
			/>
			<Text
				position={() =>
					pointAt(
						code().position(),
						code().cacheBBox().size,
						Direction.Top,
					).addY(-64)
				}
				fontFamily="Code"
				textEn="/etc/docker/daemon.json"
			/>
			<CodeBlock
				ref={code}
				y={64}
				minWidth={1450}
				fill="#181818"
				highlighter={yaml}
				code={CODE`{\n    "insecure-registries" : [${insecure}\n    ],\n    "registry-mirrors": [${mirrors}\n    ]\n}`}
			/>
		</>,
	);

	yield* slideTransition(Direction.Right);
	yield* waitForSlide('json');
	yield* all(
		insecure.append('\n        "https://docker.arvancloud.ir"', 1),
		mirrors.append('\n        "https://docker.arvancloud.ir"', 1),
	);
	yield* all(
		insecure.append(',\n        "https://docker.haiocloud.com"', 1),
		mirrors.append(',\n        "https://docker.haiocloud.com"', 1),
	);
	yield* mirrors.append(',\n        "https://docker.iranserver.com"', 1);
	yield* waitForSlide('all-mirrors');
	finishScene();
});
