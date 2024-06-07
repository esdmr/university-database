import {Code, type CodeProps, Node, Rect, Circle} from '@motion-canvas/2d';
import {createRef} from '@motion-canvas/core';

export function CodeBlock(properties: CodeProps) {
	const code = createRef<Code>();

	return (
		<Node>
			<Rect
				fill={properties.fill}
				position={() => code().position()}
				size={() => code().cacheBBox().size.add(64)}
				radius={32}
			/>
			<Code
				fontFamily="Code"
				{...properties}
				fill={undefined}
				ref={(node) => {
					code(node as Code);
					properties.ref(node);
				}}
			/>
		</Node>
	);
}
