import { Canvas2D } from 'canvas2d-wrapper';
import 'canvas2d-wrapper/dist/index.css';

import generateRandomPoints from '../../business/generateRandomPoints.js';
import getCircleList from '../../business/getCircleList.js';

import useVisitorCounter from '../../hooks/useVisitorCounter';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useWindowMovement from '../../hooks/useWindowMovement';

const randomPoints = generateRandomPoints();

export default function App() {
	const windowDimensions = useWindowDimensions();
	const delta = useWindowMovement();
	useVisitorCounter();

	return (
		<Canvas2D 
			elements={getCircleList(randomPoints, delta)}
			width={windowDimensions.width}
			height={windowDimensions.height}
			onFrame={() => {}}
			minZoom={1}
			maxZoom={1}
			tileSize={1}
		/>
	);
}