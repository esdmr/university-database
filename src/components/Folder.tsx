/**
 * This icon is from the Material Icons.
 * @see https://github.com/google/material-design-icons
 * @license Apache-2.0
 */
import {Node, Path, type PathProps} from '@motion-canvas/2d';

export function Folder(properties: Omit<PathProps, 'data'>) {
	return (
		<Node>
			<Path {...properties} data="M0 0h24v24H0V0z" opacity={0} />
			<Path
				{...properties}
				data="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
			/>
		</Node>
	);
}
