import { useEffect } from 'react';

export default function useVisitorCounter() {
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
}
