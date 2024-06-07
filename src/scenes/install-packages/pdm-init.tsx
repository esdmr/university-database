import {makeScene2D, type Code} from '@motion-canvas/2d';
import {Direction, createRef, finishScene, waitFor} from '@motion-canvas/core';
import {CodeBlock} from '../../components/CodeBlock.js';
import {Text} from '../../components/Text.js';
import {
	appendTerminal,
	clearTerminal,
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

	yield* simulateTyping(code().code, 'pdm init');
	yield* waitForSlide('init');
	yield* appendTerminal(
		code().code,
		'\n\nCreating a pyproject.toml for PDM…',
		1,
	);
	yield* waitFor(0.5);
	yield* appendTerminal(
		code().code,
		'\n\nPlease enter the Python interpreter to use',
		1,
	);
	yield* appendTerminal(code().code, '\n 0. cpython@3.12', 0.5);
	yield* appendTerminal(code().code, '\n 1. cpython@3.10', 0.5);
	yield* appendTerminal(code().code, '\n 2. cpython@3.8', 0.5);
	yield* appendTerminal(code().code, '\nPlease select (0): ', 0.5);
	yield* waitForSlide('python');
	yield* appendTerminal(
		code().code,
		'\n\nVirtualenv is created successfully at\n/home/user/university_database/.venv',
		1,
	);
	yield* waitFor(0.5);
	yield* appendTerminal(
		code().code,
		'\n\nProject name (university_database):',
		1,
	);
	yield* waitForSlide('name');
	yield* appendTerminal(code().code, '\nProject version (0.1.0):', 1);
	yield* waitForSlide('version');
	yield* appendTerminal(
		code().code,
		'\n\nDo you want to build this project for\ndistribution? [y/n] (n):',
		1,
	);
	yield* waitForSlide('build');
	yield* appendTerminal(code().code, '\n\nLicense (MIT):', 1);
	yield* waitForSlide('license');
	yield* appendTerminal(code().code, '\nAuthor name (User):', 1);
	yield* waitForSlide('author');
	yield* appendTerminal(code().code, '\nAuthor email (user@example.com):', 1);
	yield* waitForSlide('email');
	yield* appendTerminal(code().code, '\nPython requires (==3.12.*):', 1);
	yield* waitForSlide('py-req');
	yield* appendTerminal(
		code().code,
		'\n\nProject is initialized successfully',
		1,
	);
	yield* appendTerminal(code().code, '\n\n~/university_database $ ', 1);
	yield* waitFor(0.5);
	yield* clearTerminal(code().code, 1);
	finishScene();
});
