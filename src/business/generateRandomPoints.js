import { MAX_RADIUS, PARTICLE_AMOUNT } from '../config.js';

function randomThetaAndRadius() {
	const theta = Math.random() * 2 * Math.PI;
	const radius = Math.random() * MAX_RADIUS;

	return {
		theta,
		radius
	};
}

export default function generateRandomPoints() {
	return (Array(PARTICLE_AMOUNT).fill(1)).map(() => randomThetaAndRadius());
}
