import { BooApp } from './testbuild.js';

afterEach(() => {
	document.body.innerHTML = '';
});

test('snapshot', () => {
	new BooApp({
		target: document.body,
		props: {
			json: { currentDateString: '2021-04-27' },
		},
	});
	const boappNode = document.querySelector('.booapp');
	expect(boappNode).toMatchSnapshot();
});
