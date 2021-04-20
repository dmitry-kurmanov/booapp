import { Selector } from 'testcafe';
const assert = require('assert');

fixture`Calendar Component`
	.page`http://127.0.0.1:6777/?path=/story/example-calendar--primary`;

test('Next prev month btns', async (t) => {
	await t.switchToIframe('#storybook-preview-iframe');

	const April = Selector('div').withText('APRIL');
	await t.expect(April.exists).ok();

	await t.click(Selector('button').withText('Next'));
	const May = Selector('div').withText('MAY');
	await t.expect(May.exists).ok();

	await t.click(Selector('button').withText('Prev'));
    await t.click(Selector('button').withText('Prev'));
	const March = Selector('div').withText('MARCH');
	await t.expect(March.exists).ok();
});
