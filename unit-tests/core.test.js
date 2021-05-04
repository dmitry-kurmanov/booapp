import {
	getLastDateOfMonth,
	getFirstWeekDayNumberOfMonth,
	getLastWeekDayNumberOfMonth,
	getPreviousMonthDayNumbers,
	getCurrentMonthDayNumbers,
	getNextMonthDayNumbers,
	getDays,
	isWeekend,
} from '../src/core.js';

test('getLastDateOfMonth', () => {
	const fullYearNumber = 2021;
	const monthNumber = 1;

	expect(getLastDateOfMonth(fullYearNumber, undefined)).toEqual(null);
	expect(getLastDateOfMonth(undefined, monthNumber)).toEqual(null);
	expect(getLastDateOfMonth()).toBe(null);
	expect(getLastDateOfMonth('a', 'b')).toBe(null);

	expect(getLastDateOfMonth(fullYearNumber, monthNumber - 1)).toBe(31);
	expect(getLastDateOfMonth(fullYearNumber, monthNumber)).toBe(28);
	expect(getLastDateOfMonth(fullYearNumber, monthNumber + 1)).toBe(31);
});

test('getFirstWeekDayNumberOfMonth', () => {
	const fullYearNumber = 2021;
	const monthNumber = 3;

	expect(getFirstWeekDayNumberOfMonth(fullYearNumber, undefined)).toEqual(null);
	expect(getFirstWeekDayNumberOfMonth(undefined, monthNumber)).toEqual(null);
	expect(getFirstWeekDayNumberOfMonth()).toBe(null);
	expect(getFirstWeekDayNumberOfMonth('a', 'b')).toBe(null);

	// day of weeks starts with 0, so Saturday is 6
	expect(getFirstWeekDayNumberOfMonth(fullYearNumber, monthNumber)).toBe(4);
	expect(getFirstWeekDayNumberOfMonth(fullYearNumber, monthNumber - 1)).toBe(1);
	expect(getFirstWeekDayNumberOfMonth(fullYearNumber, monthNumber + 1)).toBe(6);
});

test('getLastWeekDayNumberOfMonth', () => {
	const fullYearNumber = 2021;
	const monthNumber = 3;

	expect(getLastWeekDayNumberOfMonth(fullYearNumber, undefined)).toEqual(null);
	expect(getLastWeekDayNumberOfMonth(undefined, monthNumber)).toEqual(null);
	expect(getLastWeekDayNumberOfMonth()).toBe(null);
	expect(getLastWeekDayNumberOfMonth('a', 'b')).toBe(null);

	// day of weeks starts with 0, so Saturday is 6
	expect(getLastWeekDayNumberOfMonth(fullYearNumber, monthNumber)).toBe(5);
	expect(getLastWeekDayNumberOfMonth(fullYearNumber, monthNumber - 1)).toBe(3);
	expect(getLastWeekDayNumberOfMonth(fullYearNumber, monthNumber + 1)).toBe(1);
});

test('getPreviousMonthDayNumbers', () => {
	const fullYearNumber = 2021;
	const monthNumber = 3; // April

	expect(getPreviousMonthDayNumbers(fullYearNumber, undefined)).toEqual(null);
	expect(getPreviousMonthDayNumbers(undefined, monthNumber)).toEqual(null);
	expect(getPreviousMonthDayNumbers()).toBe(null);
	expect(getPreviousMonthDayNumbers('a', 'b')).toBe(null);

	// days for March
	expect(getPreviousMonthDayNumbers(fullYearNumber, monthNumber)).toEqual([
		28,
		29,
		30,
		31,
	]);
});

test('getCurrentMonthDayNumbers', () => {
	const fullYearNumber = 2021;
	const monthNumber = 3; // April

	let expectedResult = [];

	for (let i = 1; i <= 30; i++) {
		expectedResult.push(i);
	}

	expect(getCurrentMonthDayNumbers(fullYearNumber, undefined)).toEqual(null);
	expect(getCurrentMonthDayNumbers(undefined, monthNumber)).toEqual(null);
	expect(getCurrentMonthDayNumbers()).toBe(null);
	expect(getCurrentMonthDayNumbers('a', 'b')).toBe(null);

	// days for March
	expect(getCurrentMonthDayNumbers(fullYearNumber, monthNumber)).toEqual(
		expectedResult
	);
});

test('getNextMonthDayNumbers', () => {
	const fullYearNumber = 2021;
	let monthNumber = 3; // April

	expect(getNextMonthDayNumbers(undefined)).toEqual(null);
	expect(getNextMonthDayNumbers()).toBe(null);
	expect(getNextMonthDayNumbers('a')).toBe(null);
	expect(getNextMonthDayNumbers(fullYearNumber, undefined)).toBe(null);
	expect(getNextMonthDayNumbers(undefined, monthNumber)).toEqual(null);

	// next days from the May (current Month is April)
	expect(getNextMonthDayNumbers(fullYearNumber, monthNumber)).toEqual([
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
	]);

	// next days from the June (current Month is May)
	monthNumber = 4; // May
	expect(getNextMonthDayNumbers(fullYearNumber, monthNumber)).toEqual([
		1,
		2,
		3,
		4,
		5,
	]);
});

test('isWeekend', () => {
	const fullYearNumber = 2021;
	let monthNumber = 3; // April
	let dayNumber = 11;

	expect(isWeekend(undefined, monthNumber, dayNumber)).toEqual(null);
	expect(isWeekend(fullYearNumber, undefined, dayNumber)).toEqual(null);
	expect(isWeekend(fullYearNumber, monthNumber, undefined)).toEqual(null);
	expect(isWeekend('a', 'b', 'c')).toBe(null);

	expect(isWeekend(fullYearNumber, monthNumber, dayNumber)).toBe(true);
	dayNumber = 10;
	expect(isWeekend(fullYearNumber, monthNumber, dayNumber)).toBe(true);
	dayNumber = 9;
	expect(isWeekend(fullYearNumber, monthNumber, dayNumber)).toBe(false);

	//March
	monthNumber = 2;
	dayNumber = 28;
	expect(isWeekend(fullYearNumber, monthNumber, dayNumber)).toBe(true);
	dayNumber = 29;
	expect(isWeekend(fullYearNumber, monthNumber, dayNumber)).toBe(false);

	//May
	monthNumber = 4;
	dayNumber = 2;
	expect(isWeekend(fullYearNumber, monthNumber, dayNumber)).toBe(true);
	dayNumber = 3;
	expect(isWeekend(fullYearNumber, monthNumber, dayNumber)).toBe(false);
});

test('getDays', () => {
	const fullYearNumber = 2021;
	const monthNumber = 3; // April

	let expectedResult = [];

	// prev month days
	for (let i = 28; i <= 31; i++) {
		expectedResult.push({
			number: i,
			isFromPrevOrNextMonth: true,
			isWeekend: isWeekend(fullYearNumber, monthNumber - 1, i),
		});
	}

	// current month days
	for (let j = 1; j <= 30; j++) {
		expectedResult.push({
			number: j,
			isWeekend: isWeekend(fullYearNumber, monthNumber, j),
		});
	}

	// next month days
	for (let k = 1; k <= 8; k++) {
		expectedResult.push({
			number: k,
			isFromPrevOrNextMonth: true,
			isWeekend: isWeekend(fullYearNumber, monthNumber + 1, k),
		});
	}

	expect(getDays(fullYearNumber, undefined)).toEqual(null);
	expect(getDays(undefined, monthNumber)).toEqual(null);
	expect(getDays()).toBe(null);
	expect(getDays('a', 'b')).toBe(null);

	// days for March
	expect(getDays(fullYearNumber, monthNumber)).toEqual(
		expectedResult
	);
});
