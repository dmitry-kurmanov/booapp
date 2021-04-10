import {
	getLastDateOfMonth,
	getFirstWeekDayNumberOfMonth,
	getLastWeekDayNumberOfMonth,
	getPreviousMonthDaysNumbers,
	getMonthDaysNumbers,
	getNextMonthDaysNumbers,
} from '../src/core.js';

test('getLastDateOfMonth', () => {
	const yearNumber = 2021;
	const monthNumber = 1;

	expect(getLastDateOfMonth(monthNumber)).toBe(null);
	expect(getLastDateOfMonth(yearNumber)).toBe(null);
	expect(getLastDateOfMonth()).toBe(null);
	expect(getLastDateOfMonth('a', 'b')).toBe(null);

	expect(getLastDateOfMonth(yearNumber, monthNumber - 1)).toBe(31);
	expect(getLastDateOfMonth(yearNumber, monthNumber)).toBe(28);
	expect(getLastDateOfMonth(yearNumber, monthNumber + 1)).toBe(31);
});

test('getLastDateOfMonth', () => {
	const yearNumber = 2021;
	const monthNumber = 1;

	expect(getLastDateOfMonth(monthNumber)).toBe(null);
	expect(getLastDateOfMonth(yearNumber)).toBe(null);
	expect(getLastDateOfMonth()).toBe(null);
	expect(getLastDateOfMonth('a', 'b')).toBe(null);

	expect(getLastDateOfMonth(yearNumber, monthNumber - 1)).toBe(31);
	expect(getLastDateOfMonth(yearNumber, monthNumber)).toBe(28);
	expect(getLastDateOfMonth(yearNumber, monthNumber + 1)).toBe(31);
});
test('getFirstWeekDayNumberOfMonth', () => {
	const yearNumber = 2021;
	const monthNumber = 3;

	expect(getFirstWeekDayNumberOfMonth(monthNumber)).toBe(null);
	expect(getFirstWeekDayNumberOfMonth(yearNumber)).toBe(null);
	expect(getFirstWeekDayNumberOfMonth()).toBe(null);
	expect(getFirstWeekDayNumberOfMonth('a', 'b')).toBe(null);

	// day of weeks starts with 0, so Saturday is 6
	expect(getFirstWeekDayNumberOfMonth(yearNumber, monthNumber)).toBe(4);
	expect(getFirstWeekDayNumberOfMonth(yearNumber, monthNumber - 1)).toBe(1);
	expect(getFirstWeekDayNumberOfMonth(yearNumber, monthNumber + 1)).toBe(6);
});

test('getLastWeekDayNumberOfMonth', () => {
	const yearNumber = 2021;
	const monthNumber = 3;

	expect(getLastWeekDayNumberOfMonth(monthNumber)).toBe(null);
	expect(getLastWeekDayNumberOfMonth(yearNumber)).toBe(null);
	expect(getLastWeekDayNumberOfMonth()).toBe(null);
	expect(getLastWeekDayNumberOfMonth('a', 'b')).toBe(null);

	// day of weeks starts with 0, so Saturday is 6
	expect(getLastWeekDayNumberOfMonth(yearNumber, monthNumber)).toBe(5);
	expect(getLastWeekDayNumberOfMonth(yearNumber, monthNumber - 1)).toBe(3);
	expect(getLastWeekDayNumberOfMonth(yearNumber, monthNumber + 1)).toBe(1);
});

test('getPreviousMonthDaysNumbers', () => {
	const yearNumber = 2021;
	const monthNumber = 3; // April

	const firstWeekDayNumber = getFirstWeekDayNumberOfMonth(
		yearNumber,
		monthNumber
	);
	const lastDateOfPrevMonth = getLastDateOfMonth(yearNumber, monthNumber - 1);

	expect(getPreviousMonthDaysNumbers(firstWeekDayNumber, undefined)).toEqual(
		null
	);
	expect(getPreviousMonthDaysNumbers()).toBe(null);
	expect(getPreviousMonthDaysNumbers('a', 'b')).toBe(null);

	// days for March
	expect(
		getPreviousMonthDaysNumbers(firstWeekDayNumber, lastDateOfPrevMonth)
	).toEqual([28, 29, 30, 31]);
});

test('getMonthDaysNumbers', () => {
	const yearNumber = 2021;
	const monthNumber = 3; // April
	const lastDateOfMonth = getLastDateOfMonth(yearNumber, monthNumber);

	let expectedResult = [];

	for (let i = 1; i <= 30; i++) {
		expectedResult.push(i);
	}

	expect(getMonthDaysNumbers(undefined)).toEqual(null);
	expect(getMonthDaysNumbers(null)).toBe(null);
	expect(getMonthDaysNumbers()).toBe(null);
	expect(getMonthDaysNumbers('a')).toBe(null);

	// days for March
	expect(getMonthDaysNumbers(lastDateOfMonth)).toEqual(expectedResult);
});

test('getNextMonthDaysNumbers', () => {
	const yearNumber = 2021;
	const monthNumber = 3; // April

	const lastWeekDayNumber = getLastWeekDayNumberOfMonth(
		yearNumber,
		monthNumber
	);

	expect(getNextMonthDaysNumbers(undefined)).toEqual(null);
	expect(getNextMonthDaysNumbers()).toBe(null);
	expect(getNextMonthDaysNumbers('a')).toBe(null);

	// days for March
	expect(getNextMonthDaysNumbers(lastWeekDayNumber)).toEqual([1]);
});
