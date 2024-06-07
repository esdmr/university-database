import {
	Path,
	initial,
	vector2Signal,
	type Length,
	type PathProps,
	type Vector2LengthSignal,
} from '@motion-canvas/2d';
import {type PossibleVector2, type SignalValue} from '@motion-canvas/core';

export type DiamondProperties = {
	targetSize?: SignalValue<PossibleVector2<Length>>;
	targetWidth?: SignalValue<number>;
	targetHeight?: SignalValue<number>;
} & Omit<PathProps, 'data'>;

export class Diamond extends Path {
	@initial([0, 0])
	@vector2Signal({x: 'targetWidth', y: 'targetHeight'})
	declare readonly targetSize: Vector2LengthSignal<this>;

	constructor(properties: DiamondProperties) {
		super({
			...properties,
			data: () => {
				const size = this.targetSize().div(2);
				const p0 = size.mul([0, -1]);
				const p1 = size.mul([1, 0]);
				const p2 = size.mul([0, 1]);
				const p3 = size.mul([-1, 0]);

				return `M${p0.x} ${p0.y}L${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}Z`;
			},
		});

		if (properties.size !== undefined) {
			this.targetSize(properties.size);
		}
	}
}
