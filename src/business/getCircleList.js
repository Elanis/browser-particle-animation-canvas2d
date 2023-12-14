import { Circle } from 'canvas2d-wrapper';

import { MAX_RADIUS, shapeDelta } from '../config.js';

function getCoordinatesFromData(data, shapeIndex) {
	const timeDelta = (Date.now()) / data.radius / 10;

	return {
		x: Math.round(data.radius * Math.cos(data.theta + timeDelta)) + shapeDelta[shapeIndex].x,
		y: Math.round(data.radius * Math.sin(data.theta + timeDelta)) + shapeDelta[shapeIndex].y,
	}
}

function lerp(a, b, alpha) {
	return a + alpha * (b - a);
}

function getColorFromDistanceToCenter(data) {
	return '#' + Math.round(lerp(0xAA0000, 0xAAFFFF, data.radius / MAX_RADIUS)).toString(16).padStart('0', 6);
}

function pointToCircle(e, delta, pointIndex, shapeIndex) {
	const coordinates = getCoordinatesFromData(e, shapeIndex);

	return new Circle({
		id: pointIndex,
		x: delta.x + coordinates.x,
		y: delta.y + coordinates.y,
		radius: 1,
		fill: getColorFromDistanceToCenter(e),
	});
}

export default function getCircleList(randomPoints, delta) {
	const max = Math.min(parseInt(localStorage.visitors || 1), shapeDelta.length);
	let res = [];
	for(let shapeIndex = 0; shapeIndex < max; shapeIndex++) {
		res = [...res, ...randomPoints.map((e, pointIndex) => pointToCircle(e, delta, pointIndex, shapeIndex))]
	}

	return res;
}