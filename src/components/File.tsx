/**
 * This icon is from the Material Icons.
 * @see https://github.com/google/material-design-icons
 * @license Apache-2.0
 */
import {Node, Path, type PathProps} from '@motion-canvas/2d';

export function File(properties: Omit<PathProps, 'data'>) {
	return (
		<Node>
			<Path {...properties} data="M0 0h24v24H0V0z" opacity={0} />
			<Path
				{...properties}
				data="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
			/>
		</Node>
	);
}
