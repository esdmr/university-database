import {
	Circle,
	Line,
	Node,
	Rect,
	initial,
	signal,
	type NodeProps,
	type Txt,
} from '@motion-canvas/2d';
import {spacingSignal} from '@motion-canvas/2d/lib/decorators/spacingSignal.js';
import {
	Direction,
	Vector2,
	createRef,
	type PossibleSpacing,
	type SignalValue,
	type SimpleSignal,
	type SpacingSignal,
	useScene,
} from '@motion-canvas/core';
import {pointAt} from '../utils.js';
import {Diamond} from './Diamond.js';
import {Text} from './Text.js';

export enum VertexShape {
	Rectangle,
	Oval,
	Circle,
	Diamond,
}

export type VertexProperties = {
	nameFa?: SignalValue<string>;
	nameEn?: SignalValue<string>;
	radius?: SignalValue<PossibleSpacing>;
	radiusTop?: SignalValue<PossibleSpacing>;
	radiusRight?: SignalValue<PossibleSpacing>;
	radiusBottom?: SignalValue<PossibleSpacing>;
	radiusLeft?: SignalValue<PossibleSpacing>;
	shape?: VertexShape;
	underline?: SignalValue<boolean>;
	dashed?: SignalValue<boolean>;
} & NodeProps;

export class Vertex extends Node {
	@initial('')
	@signal()
	declare readonly nameFa: SimpleSignal<string, this>;

	@initial('')
	@signal()
	declare readonly nameEn: SimpleSignal<string, this>;

	@initial(0)
	@spacingSignal('radius')
	declare readonly radius: SpacingSignal<this>;

	@initial(false)
	@signal()
	declare readonly underline: SimpleSignal<boolean, this>;

	@initial(false)
	@signal()
	declare readonly dashed: SimpleSignal<boolean, this>;

	@initial(VertexShape.Rectangle)
	@signal()
	declare readonly shape: SimpleSignal<VertexShape, this>;

	readonly top = Vector2.createSignal(() =>
		pointAt(this.position(), this.box(), Direction.Top),
	);

	readonly bottom = Vector2.createSignal(() =>
		pointAt(this.position(), this.box(), Direction.Bottom),
	);

	readonly left = Vector2.createSignal(() =>
		pointAt(this.position(), this.box(), Direction.Left),
	);

	readonly right = Vector2.createSignal(() =>
		pointAt(this.position(), this.box(), Direction.Right),
	);

	readonly text = createRef<Txt>();

	readonly box = Vector2.createSignal(() => {
		const textSize = this.text().cacheBBox().size;
		const max = Math.max(textSize.width, textSize.height);

		return this.shape() === VertexShape.Diamond
			? textSize.add(64)
			: this.shape() === VertexShape.Circle
				? new Vector2(max)
				: textSize.add([16, 32]);
	});

	readonly lang = useScene().variables.get('lang', 'en');

	constructor(properties?: VertexProperties) {
		super({...properties, children: undefined});

		const R =
			this.shape() === VertexShape.Rectangle
				? Rect
				: this.shape() === VertexShape.Diamond
					? Diamond
					: Circle;

		this.add(
			<>
				<R
					stroke="#181818"
					lineWidth={2}
					fill="#f1f1f1"
					layout
					margin={32}
					lineDash={() => (this.dashed() ? [10, 10] : [])}
					smoothCorners
					radius={this.radius}
					size={this.box}
				/>
				<Text
					ref={this.text}
					fill="black"
					textFa={this.nameFa}
					textEn={this.nameEn}
				>
					{Array.isArray(properties.children)
						? properties.children
						: [properties.children]}
				</Text>
				<Line
					lineWidth={() => (this.underline() ? 2 : 0)}
					stroke="black"
					points={() => {
						const bbox = this.text().cacheBBox();
						const yOffset = this.lang() === 'fa' ? -24 : -8;
						return [
							bbox.bottomLeft.add([20, yOffset]),
							bbox.bottomRight.add([-20, yOffset]),
						];
					}}
				/>
			</>,
		);
	}
}
