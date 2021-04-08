import { BooApp } from '../build/components.js';

test('components => BooApp => currentDate', () => {
	const booAppInstance = new BooApp({
		target: document.body,
		props: {},
	});

	expect(booAppInstance.currentDate.getDate()).toEqual(new Date().getDate());
});
