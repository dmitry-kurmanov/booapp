import {
	getLastDateOfMonth,
	getFirstWeekDayNumberOfMonth,
	getLastWeekDayNumberOfMonth,
	getPreviousMonthDaysNumbers,
	getCurrentMonthDaysNumbers,
	getNextMonthDaysNumbers,
	isToday,
	isWeekend,
} from '../src/core.js';

test('getLastDateOfMonth', () => {
	const yearNumber = 2021;
	const monthNumber = 1;

	expect(getLastDateOfMonth(yearNumber, undefined)).toEqual(null);
	expect(getLastDateOfMonth(undefined, monthNumber)).toEqual(null);
	expect(getLastDateOfMonth()).toBe(null);
	expect(getLastDateOfMonth('a', 'b')).toBe(null);

	expect(getLastDateOfMonth(yearNumber, monthNumber - 1)).toBe(31);
	expect(getLastDateOfMonth(yearNumber, monthNumber)).toBe(28);
	expect(getLastDateOfMonth(yearNumber, monthNumber + 1)).toBe(31);
});

test('getFirstWeekDayNumberOfMonth', () => {
	const yearNumber = 2021;
	const monthNumber = 3;

	expect(getFirstWeekDayNumberOfMonth(yearNumber, undefined)).toEqual(null);
	expect(getFirstWeekDayNumberOfMonth(undefined, monthNumber)).toEqual(null);
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

	expect(getLastWeekDayNumberOfMonth(yearNumber, undefined)).toEqual(null);
	expect(getLastWeekDayNumberOfMonth(undefined, monthNumber)).toEqual(null);
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

	expect(getPreviousMonthDaysNumbers(yearNumber, undefined)).toEqual(null);
	expect(getPreviousMonthDaysNumbers(undefined, monthNumber)).toEqual(null);
	expect(getPreviousMonthDaysNumbers()).toBe(null);
	expect(getPreviousMonthDaysNumbers('a', 'b')).toBe(null);

	// days for March
	expect(getPreviousMonthDaysNumbers(yearNumber, monthNumber)).toEqual([
		28,
		29,
		30,
		31,
	]);
});

test('getCurrentMonthDaysNumbers', () => {
	const yearNumber = 2021;
	const monthNumber = 3; // April

	let expectedResult = [];

	for (let i = 1; i <= 30; i++) {
		expectedResult.push(i);
	}

	expect(getCurrentMonthDaysNumbers(yearNumber, undefined)).toEqual(null);
	expect(getCurrentMonthDaysNumbers(undefined, monthNumber)).toEqual(null);
	expect(getCurrentMonthDaysNumbers()).toBe(null);
	expect(getCurrentMonthDaysNumbers('a', 'b')).toBe(null);

	// days for March
	expect(getCurrentMonthDaysNumbers(yearNumber, monthNumber)).toEqual(
		expectedResult
	);
});

test('getNextMonthDaysNumbers', () => {
	const yearNumber = 2021;
	let monthNumber = 3; // April

	expect(getNextMonthDaysNumbers(undefined)).toEqual(null);
	expect(getNextMonthDaysNumbers()).toBe(null);
	expect(getNextMonthDaysNumbers('a')).toBe(null);
	expect(
		getNextMonthDaysNumbers(yearNumber, undefined)
	).toBe(null);
	expect(
		getNextMonthDaysNumbers(undefined, monthNumber)
	).toEqual(null);

	// next days from the May (current Month is April)
	expect(
		getNextMonthDaysNumbers(yearNumber, monthNumber)
	).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

	// next days from the June (current Month is May)
	monthNumber = 4; // May
	expect(
		getNextMonthDaysNumbers(yearNumber, monthNumber)
	).toEqual([1, 2, 3, 4, 5]);
});

test('isWeekend', () => {
	const yearNumber = 2021;
	let monthNumber = 3; // April
	let dayNumber = 11;

	expect(isWeekend(undefined, monthNumber, dayNumber)).toEqual(null);
	expect(isWeekend(yearNumber, undefined, dayNumber)).toEqual(null);
	expect(isWeekend(yearNumber, monthNumber, undefined)).toEqual(null);
	expect(isWeekend('a', 'b', 'c')).toBe(null);

	expect(isWeekend(yearNumber, monthNumber, dayNumber)).toBe(true);
	dayNumber = 10;
	expect(isWeekend(yearNumber, monthNumber, dayNumber)).toBe(true);
	dayNumber = 9;
	expect(isWeekend(yearNumber, monthNumber, dayNumber)).toBe(false);

	//March
	monthNumber = 2;
	dayNumber = 28;
	expect(isWeekend(yearNumber, monthNumber, dayNumber)).toBe(true);
	dayNumber = 29;
	expect(isWeekend(yearNumber, monthNumber, dayNumber)).toBe(false);

	//May
	monthNumber = 4;
	dayNumber = 2;
	expect(isWeekend(yearNumber, monthNumber, dayNumber)).toBe(true);
	dayNumber = 3;
	expect(isWeekend(yearNumber, monthNumber, dayNumber)).toBe(false);
});
