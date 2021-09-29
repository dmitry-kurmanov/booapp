import { Selector } from 'testcafe';

fixture`Calendar Component`
	.page`http://localhost:6006/iframe.html?id=example-calendar--preset-date&args=&viewMode=story`;

test('Next prev month btns', async (t) => {
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

test('Screenshot testing (visual)', async (t) => {
	await t.takeElementScreenshot(
		Selector('.booapp-calendar'),
		'./screenshots/calendar.png',
		{
			fullPage: true,
		}
	);
});
