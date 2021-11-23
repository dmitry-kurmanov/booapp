import { Calendar } from '../_test-build.js';

afterEach(() => {
	document.body.innerHTML = '';
});

test('goToNextMonth', () => {
	const calendar = new Calendar({
		target: document.body,
		props: {},
	});

	const date = new Date();
	const currentMonth = date.getMonth();
	const currentYear = date.getFullYear();

	calendar.goToNextMonth();
	expect(calendar.fullYearNumber).toEqual(currentYear);
	expect(calendar.monthNumber).toEqual(currentMonth + 1);

	calendar.monthNumber = 11;

	calendar.goToNextMonth();
	expect(calendar.fullYearNumber).toEqual(currentYear + 1);
	expect(calendar.monthNumber).toEqual(0);
});

test('goToPrevMonth', () => {
	const calendar = new Calendar({
		target: document.body,
		props: {},
	});

	const date = new Date();
	const currentMonth = date.getMonth();
	const currentYear = date.getFullYear();

	calendar.goToPrevMonth();
	expect(calendar.fullYearNumber).toEqual(currentYear);
	expect(calendar.monthNumber).toEqual(currentMonth - 1);

	calendar.monthNumber = 0;

	calendar.goToPrevMonth();
	expect(calendar.fullYearNumber).toEqual(currentYear - 1);
	expect(calendar.monthNumber).toEqual(11);
});

test('snapshot', () => {
	new Calendar({
		target: document.body,
		props: {
			dateString: '2021-04-27',
		},
	});
	const calendarNode = document.querySelector('.booapp-calendar');
	expect(calendarNode).toMatchSnapshot();
});
