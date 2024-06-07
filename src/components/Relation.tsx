import {Vertex, VertexShape, type VertexProperties} from './Vertex.js';

export function Relation(properties: VertexProperties) {
	return <Vertex {...properties} shape={VertexShape.Diamond} />;
}
