import {makeScene2D, type Code} from '@motion-canvas/2d';
import {Direction, createRef, finishScene, waitFor} from '@motion-canvas/core';
import {CodeBlock} from '../../components/CodeBlock.js';
import {Text} from '../../components/Text.js';
import {
	appendTerminal,
	pointAt,
	simulateTyping,
	waitForSlide,
} from '../../utils.js';

export default makeScene2D(function* (view) {
	const code = createRef<Code>();

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
				textEn="Terminal"
			/>
			<CodeBlock
				ref={code}
				y={32}
				minWidth={1450}
				fill="#181818"
				highlighter={null}
				code="~/university_database $ "
			/>
		</>,
	);

	yield* simulateTyping(
		code().code,
		'pdm add pymysql jupyterlab\nipython-sql sqlalchemy',
	);
	yield* waitForSlide('add');
	yield* appendTerminal(
		code().code,
		'\n\nAdding packages to default dependencies:\npymysql, jupyterlab, ipython-sql, sqlalchemy',
		1,
	);
	yield* waitFor(0.5);
	yield* appendTerminal(code().code, '\n\nLock successful 🔒', 1);
	yield* waitFor(0.5);
	yield* appendTerminal(
		code().code,
		'\nChanges are written to pyproject.toml.',
		1,
	);
	yield* waitFor(0.5);
	yield* appendTerminal(code().code, '\nResolving packages from lockfile…', 1);
	yield* waitFor(0.5);
	yield* appendTerminal(
		code().code,
		'\n\nSynchronizing working set with resolved\npackages: 93 to add, 0 to update, 0 to remove',
		1,
	);
	yield* waitFor(0.5);
	yield* appendTerminal(code().code, '\n\nAll complete! 🎉', 1);
	yield* waitFor(0.5);
	yield* appendTerminal(code().code, '\n\n~/university_database $ ', 1);
	yield* waitFor(2);
	finishScene();
});
