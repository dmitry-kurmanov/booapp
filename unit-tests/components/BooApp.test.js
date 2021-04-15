import { BooApp } from './testbuild.js';

test('snapshot', () => {
	new BooApp({
		target: document.body,
		props: {},
	});
	const boappNode = document.querySelector('.booapp');
	expect(boappNode).toMatchSnapshot();
});
