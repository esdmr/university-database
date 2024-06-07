import {Vertex, type VertexProperties} from './Vertex.js';

export function Entity(properties: VertexProperties) {
	return <Vertex {...properties} />;
}
