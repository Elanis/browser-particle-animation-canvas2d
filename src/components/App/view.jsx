import { useEffect, useState } from 'react';

import { Canvas2D, Circle } from 'canvas2d-wrapper';
import 'canvas2d-wrapper/dist/index.css';

import useWindowDimensions from '../../hooks/useWindowDimensions';

const MAX_RADIUS = 250;
const PARTICLE_AMOUNT = 2500;

function randomThetaAndRadius() {
	const theta = Math.random() * 2 * Math.PI;
	const radius = Math.random() * MAX_RADIUS;

	return {
		theta,
		radius
	};
}

const shapeDelta = [
	{
		x: 400,
		y: 150,
	},
	{
		x: 1200,
		y: 200,
	},
	{
		x: 1000,
		y: 900,
	}
];

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

const randomPoints = (Array(PARTICLE_AMOUNT).fill(1)).map(() => randomThetaAndRadius());

export default function App() {
	const windowDimensions = useWindowDimensions();
	const [delta, setDelta] = useState({ x: 0, y: 0 });

	const elements = Array(Math.min(parseInt(localStorage.visitors || 1), shapeDelta.length)).fill(0).map((e, shapeIndex) => {
		return randomPoints.map((e, index) => {
			const coordinates = getCoordinatesFromData(e, shapeIndex);

			return new Circle({
				id: index,
				x: delta.x + coordinates.x,
				y: delta.y + coordinates.y,
				radius: 1,
				fill: getColorFromDistanceToCenter(e),
			});
		});
	}).flat();

	useEffect(() => {
		let doIt = true;
		function applyWindowMovement() {
			setDelta((currDelta) => {
				return {
					x: -window.screenX,
					y: -window.screenY,
				};
			});

			if(doIt) {
				window.requestAnimationFrame(applyWindowMovement);
			}
		}

		window.requestAnimationFrame(applyWindowMovement);

		return () => { doIt = false; };
	}, []);

	useEffect(() => {
		let visitors = parseInt(localStorage.visitors);
		if(Number.isNaN(visitors)) {
			visitors = 0;
		}

		visitors++;
		localStorage.visitors = visitors;

		function cb() {
			let visitors = parseInt(localStorage.visitors);
			visitors--;
			localStorage.visitors = visitors;
		}

		window.addEventListener('beforeunload', cb);
	}, []);

	return (
		<Canvas2D 
			elements={elements}
			width={windowDimensions.width}
			height={windowDimensions.height}
			minZoom={1}
			maxZoom={1}
			tileSize={1}
			onClick={(e) => {
				console.log('Click event:', e);
			}}
		/>
	);
}