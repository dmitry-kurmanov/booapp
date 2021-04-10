import { Calendar } from './testbuild.js';

test('dateInstance date', () => {
	const instance = new Calendar({
		target: document.body,
		props: {},
	});

	expect(instance.dateInstance.getDate()).toEqual(new Date().getDate());
});
