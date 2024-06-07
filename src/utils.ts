import {
	lines,
	resolveScope,
	type CodeSignal,
	type Node,
} from '@motion-canvas/2d';
import {
	PlaybackState,
	Vector2,
	all,
	beginSlide,
	createRefMap,
	createSignal,
	easeInOutCubic,
	unwrap,
	useDuration,
	usePlayback,
	useScene,
	useTransition,
	waitFor,
	type Direction,
	type Reference,
} from '@motion-canvas/core';
import {type Attribute} from './components/Attribute.js';
import {type Edge} from './components/Edge.js';
import {type Vertex} from './components/Vertex.js';

export function interpolate(t: number, from: number, to: number) {
	return (1 - t) * from + t * to;
}

export function modulo(a: number, b: number) {
	return ((a % b) + b) % b;
}

export function pointAt(
	position: Vector2,
	size: Vector2,
	direction: Direction,
) {
	return size.div(2).mul(Vector2.fromOrigin(direction)).add(position);
}

export function createGraph() {
	return {
		attributes: createRefMap<Attribute>(),
		vertices: createRefMap<Vertex>(),
		edges: createRefMap<Edge>(),
		nodes: createRefMap<Node>(),
	};
}

export function* reveal(relation: Reference<Vertex> | Array<Reference<Node>>) {
	if (Array.isArray(relation)) {
		yield* all(...relation.map((i) => i().opacity(1, 1, easeInOutCubic)));
	} else if (typeof relation === 'function') {
		yield* relation().opacity(1, 1, easeInOutCubic);
	}
}

export function fixBiDi(text: string) {
	return `\u{2067}${text}\u{2069}`;
}

export function getParsedCode(code: CodeSignal<any>) {
	return resolveScope(code(), (scope) => unwrap(scope.progress) > 0.5);
}

export function* actuallyFadeTransition(duration = 0.6) {
	const previousAlpha = createSignal(1);
	const currentAlpha = createSignal(0);
	const endTransition = useTransition(
		(context) => {
			context.globalAlpha = currentAlpha();
		},
		(context) => {
			context.globalAlpha = previousAlpha();
		},
	);
	yield* all(previousAlpha(0, duration), currentAlpha(1, duration));
	endTransition();
}

export function* appendTerminal(
	code: CodeSignal<any>,
	text: string,
	duration = 1,
	maxHeight = 15,
) {
	let count = 0;

	for (const char of getParsedCode(code) + text) {
		count += Number(char === '\n');
	}

	if (count > maxHeight) {
		yield* all(
			code.remove(lines(0, count - maxHeight - 1), duration),
			code.append(text, duration),
		);
	} else {
		yield* code.append(text, duration);
	}
}

export function* simulateTyping(
	code: CodeSignal<any>,
	text: string,
	duration = text.length / 20,
) {
	const {length} = [...text];

	for (const char of text) {
		code.append(char);
		yield* waitFor(duration / length);
	}
}

export function* clearTerminal(code: CodeSignal<any>, duration = 1) {
	let count = 0;

	for (const char of getParsedCode(code)) {
		count += Number(char === '\n');
	}

	yield* code.remove(lines(0, count - 1), duration);
}

export function* waitForSlide(name: string, duration = useDuration(name)) {
	yield* beginSlide(useScene().name + '/' + name);

	if (usePlayback().state !== PlaybackState.Presenting) {
		yield* waitFor(duration);
	}
}
