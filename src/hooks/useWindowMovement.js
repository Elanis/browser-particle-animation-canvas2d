import { useEffect, useState } from 'react';

export default function useWindowMovement() {
	const [delta, setDelta] = useState({ x: 0, y: 0 });

	useEffect(() => {
		let doIt = true;
		function applyWindowMovement() {
			setDelta((/*currDelta*/) => {
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

	return delta;
}