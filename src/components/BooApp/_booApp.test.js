import { BooApp } from '../_test-build.js';

afterEach(() => {
	document.body.innerHTML = '';
});

test('snapshot', () => {
	new BooApp({
		target: document.body,
		props: {
			json: { selectedDateString: '2021-04-27' },
		},
	});
	const boappNode = document.querySelector('.booapp');
	expect(boappNode).toMatchSnapshot();
});
