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

test('select date', async (t) => {
	const FirstDayOfMonth = Selector('.booapp-calendar__day').withText('1');
	await t.expect(FirstDayOfMonth.exists).ok();

	await t.click(FirstDayOfMonth);
	await t
		.expect(FirstDayOfMonth.hasClass('booapp-calendar__day--selected'))
		.ok();
});

// test('current date section', async (t) => {
// 	const date = new Date();
// 	const day = '' + date.getDate();
// 	const fullYear = '' + date.getFullYear();

// 	const currentDateSection = Selector('.booapp-calendar-current-date')
// 		.withText(day)
// 		.withText(fullYear);

// 	await t.expect(currentDateSection.exists).ok();

// 	const FirstDayOfMonth = Selector('.booapp-calendar__day').withText('1');
// 	await t.click(FirstDayOfMonth);
// 	await t.expect(currentDateSection.exists).ok();
// });

// test('selected date section', async (t) => {
// 	const selectedDateSection = Selector('.booapp-calendar-selected-date');

// 	const CurrentDayOfMonth = Selector('.booapp-calendar__day--current');
// 	const FirstDayOfMonth = Selector('.booapp-calendar__day').withText('1');

// 	await t.click(CurrentDayOfMonth);
// 	await t.expect(selectedDateSection.withText('today').exists).ok();

// 	await t.click(FirstDayOfMonth);
// 	await t.expect(selectedDateSection.withText('1').exists).ok();
// });

test('Screenshot testing (visual)', async (t) => {
	await t.takeElementScreenshot(
		Selector('.booapp-calendar'),
		'./screenshots/calendar.png',
		{
			fullPage: true,
		}
	);
});
