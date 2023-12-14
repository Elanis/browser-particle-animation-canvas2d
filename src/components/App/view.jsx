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

function getCoordinatesFromData(data) {
	const timeDelta = (Date.now()) / data.radius / 10;

	return {
		x: Math.round(data.radius * Math.cos(data.theta + timeDelta)),
		y: Math.round(data.radius * Math.sin(data.theta + timeDelta)),
	}
}

function lerp(a, b, alpha) {
	return a + alpha * (b - a);
}

function getColorFromDistanceToCenter(data) {
	return '#' + Math.round(lerp(0xFF0000, 0x00FF00, data.radius / MAX_RADIUS)).toString(16).padStart('0', 6);
}

const randomPoints = (Array(PARTICLE_AMOUNT).fill(1)).map(() => randomThetaAndRadius());

export default function App() {
	const windowDimensions = useWindowDimensions();
	const [delta, setDelta] = useState({ x: 0, y: 0 });

	const elements = randomPoints.map((e, index) => {
		const coordinates = getCoordinatesFromData(e);

		return new Circle({
			id: index,
			x: delta.x + coordinates.x,
			y: delta.y + coordinates.y,
			radius: 1,
			fill: getColorFromDistanceToCenter(e),
		});
	});

	useEffect(() => {
		let doIt = true;
		let prevX = null;
		let prevY = null;
		function applyWindowMovement() {
			if(prevX !== null) {
				setDelta((currDelta) => {
					return {
						x: -window.screenX + 600,
						y: -window.screenY + 150,
					};
				});
			}

			prevX = window.screenX;
			prevY = window.screenY;

			if(doIt) {
				window.requestAnimationFrame(applyWindowMovement);
			}
		}

		window.requestAnimationFrame(applyWindowMovement);

		return () => { doIt = false; };
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