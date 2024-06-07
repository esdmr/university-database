import {initial, signal} from '@motion-canvas/2d';
import {
	TxtLeaf,
	type TxtLeafProps,
} from '@motion-canvas/2d/lib/components/TxtLeaf.js';
import {
	useScene,
	type SignalValue,
	type SimpleSignal,
} from '@motion-canvas/core';
import {fixBiDi} from '../utils.js';

export type TextLeafProperties = {
	textFa?: SignalValue<string>;
	textEn?: SignalValue<string>;
} & TxtLeafProps;

export class TextLeaf extends TxtLeaf {
	@initial('')
	@signal()
	declare readonly textFa: SimpleSignal<string, this>;

	@initial('')
	@signal()
	declare readonly textEn: SimpleSignal<string, this>;

	readonly lang = useScene().variables.get('lang', 'en');

	constructor(properties: TextLeafProperties) {
		super({
			...properties,
			text: () =>
				(this.lang() === 'fa' && this.textFa() ? fixBiDi(this.textFa()) : '') ||
				this.textEn(),
		});
	}
}
