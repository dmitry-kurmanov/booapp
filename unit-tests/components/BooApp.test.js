import { BooApp } from './testbuild.js';

test('currentDate', () => {
	const instance = new BooApp({
		target: document.body,
		props: {},
	});

	expect(!!instance).toBe(true);
});
