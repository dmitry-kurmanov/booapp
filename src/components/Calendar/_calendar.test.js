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
	expect(calendar.selectedMonthNumber).toEqual(currentMonth + 1);

	calendar.selectedMonthNumber = 11;

	calendar.goToNextMonth();
	expect(calendar.fullYearNumber).toEqual(currentYear + 1);
	expect(calendar.selectedMonthNumber).toEqual(0);
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
	expect(calendar.selectedMonthNumber).toEqual(currentMonth - 1);

	calendar.selectedMonthNumber = 0;

	calendar.goToPrevMonth();
	expect(calendar.fullYearNumber).toEqual(currentYear - 1);
	expect(calendar.selectedMonthNumber).toEqual(11);
});

test('selectDate', () => {
	const calendar = new Calendar({
		target: document.body,
		props: {},
	});

	const currentDateInstance = new Date();

	expect(calendar.selectedDateInstance.getDate()).toEqual(
		currentDateInstance.getDate()
	);

	const selectedDateInstance = new Date('2021-04-27');

	calendar.selectDate(
		selectedDateInstance.getFullYear(),
		selectedDateInstance.getMonth(),
		selectedDateInstance.getDate()
	);

	expect(calendar.selectedDateInstance.getDate()).toEqual(
		selectedDateInstance.getDate()
	);
});

test('snapshot', () => {
	new Calendar({
		target: document.body,
		props: {
			selectedDateString: '2021-04-27',
		},
	});
	const calendarNode = document.querySelector('.booapp-calendar');
	expect(calendarNode).toMatchSnapshot();
});
