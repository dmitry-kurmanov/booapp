import { BooApp } from './testbuild.js';

test('currentDate', () => {
	const booAppInstance = new BooApp({
		target: document.body,
		props: {},
	});

	expect(booAppInstance.currentDate.getDate()).toEqual(new Date().getDate());
});
