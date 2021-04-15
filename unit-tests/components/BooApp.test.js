import { BooApp } from './testbuild.js';

afterEach(() => {
	document.body.innerHTML = '';
});

test('snapshot', () => {
	new BooApp({
		target: document.body,
		props: {},
	});
	const boappNode = document.querySelector('.booapp');
	expect(boappNode).toMatchSnapshot();
});
