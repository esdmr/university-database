import {
	Node,
	initial,
	signal,
	type NodeProps,
	Rect,
	colorSignal,
	type PossibleCanvasStyle,
	canvasStyleSignal,
	type CanvasStyleSignal,
	type View2D,
} from '@motion-canvas/2d';
import {
	type SimpleSignal,
	type SignalValue,
	useScene,
	type ColorSignal,
	type PossibleColor,
	Color,
	createRef,
} from '@motion-canvas/core';
import {Text} from './Text.js';

export type PartHeadingProperties = {
	number?: SignalValue<number>;
	titleFa?: SignalValue<string>;
	titleEn?: SignalValue<string>;
} & NodeProps;

export class PartHeading extends Node {
	@initial(0)
	@signal()
	declare readonly number: SimpleSignal<number, this>;

	@initial('')
	@signal()
	declare readonly titleFa: SimpleSignal<string, this>;

	@initial('')
	@signal()
	declare readonly titleEn: SimpleSignal<string, this>;

	constructor(properties: PartHeadingProperties) {
		super(properties);

		this.add(
			<>
				<Text
					fontSize={96}
					fill="#aa466f"
					position={[0, -200]}
					textFa={() => `بخش ${this.number().toLocaleString('fa-IR')}`}
					textEn={() => `Part ${this.number()}`}
				/>
				<Text
					fontSize={192}
					fill="#241527"
					textFa={this.titleFa}
					textEn={this.titleEn}
				/>
			</>,
		);
	}
}
