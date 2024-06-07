import {
	CubicBezier,
	Node,
	initial,
	signal,
	vector2Signal,
	type NodeProps,
} from '@motion-canvas/2d';
import {
	Direction,
	Vector2,
	createRef,
	type PossibleVector2,
	type SignalValue,
	type SimpleSignal,
	type Vector2Signal,
	createSignal,
	BBox,
	useLogger,
} from '@motion-canvas/core';
import {interpolate, modulo} from '../utils.js';
import {Text} from './Text.js';
import {type Vertex} from './Vertex.js';

export type EdgeCardinality =
	| ['0', '0' | '1' | 'M' | 'N']
	| ['1', '1' | 'M' | 'N']
	| ['M', 'M' | 'N']
	| ['N', 'M' | 'N'];

export type EdgeMultiplicity =
	| EdgeCardinality[0]
	| {[K in EdgeCardinality as K[0]]: `${K[0]}..${K[1]}`}[EdgeCardinality[0]];

export type EdgeProperties = {
	start?: SignalValue<PossibleVector2>;
	startX?: SignalValue<number>;
	startY?: SignalValue<number>;
	end?: SignalValue<PossibleVector2>;
	endX?: SignalValue<number>;
	endY?: SignalValue<number>;
	horizontal?: SignalValue<boolean>;
	multiplicity?: SignalValue<EdgeMultiplicity>;
	multiplicityAnchor?: SignalValue<PossibleVector2>;
} & NodeProps;

export class Edge extends Node {
	@initial([0, 0])
	@vector2Signal('start')
	declare readonly start: Vector2Signal<this>;

	@initial([0, 0])
	@vector2Signal('end')
	declare readonly end: Vector2Signal<this>;

	@initial(false)
	@signal()
	declare readonly horizontal: SimpleSignal<boolean, this>;

	@initial('')
	@signal()
	declare readonly multiplicity: SimpleSignal<string, this>;

	@initial(Vector2.fromOrigin(Direction.Top))
	@signal()
	declare readonly multiplicityAnchor: Vector2Signal<this>;

	readonly p0 = Vector2.createSignal(() => this.start());
	readonly p3 = Vector2.createSignal(() => this.end());

	readonly p1 = Vector2.createSignal(() => [
		interpolate(this.horizontal() ? 0.8 : 0.2, this.p0().x, this.p3().x),
		interpolate(this.horizontal() ? 0.2 : 0.8, this.p0().y, this.p3().y),
	]);

	readonly p2 = Vector2.createSignal(() => [
		interpolate(this.horizontal() ? 0.2 : 0.8, this.p0().x, this.p3().x),
		interpolate(this.horizontal() ? 0.8 : 0.2, this.p0().y, this.p3().y),
	]);

	readonly curve = createRef<CubicBezier>();

	constructor(properties: EdgeProperties) {
		super({...properties});

		this.add(
			<>
				<CubicBezier
					ref={this.curve}
					p0={this.p0}
					p1={this.p1}
					p2={this.p2}
					p3={this.p3}
					stroke="#181818"
					lineWidth={4}
				/>
				<Text
					textEn={this.multiplicity}
					fill="black"
					textAlign={() =>
						this.multiplicityAnchor().x < 0
							? 'right'
							: this.multiplicityAnchor().x > 0
								? 'left'
								: 'center'
					}
					position={() =>
						this.curve()
							.getPointAtPercentage(0.5)
							.position.add(this.multiplicityAnchor().mul(25))
					}
				/>
			</>,
		);
	}
}
