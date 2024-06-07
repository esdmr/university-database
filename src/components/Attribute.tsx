import {initial, signal} from '@motion-canvas/2d';
import {type SignalValue, type SimpleSignal} from '@motion-canvas/core';
import {TextLeaf} from './TextLeaf.js';
import {Vertex, VertexShape, type VertexProperties} from './Vertex.js';

export type AttributeProperties = {
	type?: SignalValue<string>;
} & VertexProperties;

export class Attribute extends Vertex {
	@initial('')
	@signal()
	declare readonly type: SimpleSignal<string, this>;

	constructor(properties: AttributeProperties) {
		super({
			...properties,
			shape: VertexShape.Oval,
			nameEn: properties.nameEn,
			nameFa: properties.nameFa,
		});

		this.text().add(
			<>
				<TextLeaf textEn={() => this.type() && ' : '} />
				<TextLeaf textEn={() => this.type().toLowerCase()} />
			</>,
		);
	}
}
