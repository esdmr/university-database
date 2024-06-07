import {Txt, initial, signal, type TxtProps} from '@motion-canvas/2d';
import {
	useScene,
	type SignalValue,
	type SimpleSignal,
} from '@motion-canvas/core';
import {fixBiDi} from '../utils.js';

export type TextProperties = {
	textFa?: SignalValue<string>;
	textEn?: SignalValue<string>;
} & TxtProps;

export class Text extends Txt {
	@initial('')
	@signal()
	declare readonly textFa: SimpleSignal<string, this>;

	@initial('')
	@signal()
	declare readonly textEn: SimpleSignal<string, this>;

	readonly lang = useScene().variables.get('lang', 'en');

	constructor(properties: TextProperties) {
		if (
			[properties.children].flat(Number.POSITIVE_INFINITY).filter(Boolean)
				.length === 0
		) {
			properties.textDirection = () =>
				this.lang() === 'fa' && this.textFa() ? 'rtl' : 'ltr';

			properties.text = () =>
				(this.lang() === 'fa' && this.textFa() ? fixBiDi(this.textFa()) : '') ||
				this.textEn();
		}

		super({
			fontFamily: 'Main',
			...properties,
		});
	}
}
