import { useEffect, useState } from 'react';

import { Canvas2D, Circle } from 'canvas2d-wrapper';
import 'canvas2d-wrapper/dist/index.css';

import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function App() {
	const windowDimensions = useWindowDimensions();
	const [delta, setDelta] = useState({ x: 0, y: 0 });

	const elements = [new Circle({
		id: 1,
		x: delta.x,
		y: delta.y,
		radius: 5,
		fill: 'white',
	})];

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