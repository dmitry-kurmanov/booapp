export const getLastDateOfMonth = (yearNumber, monthNumber) => {
	if (typeof yearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;
	// zero day number means the last day from the previous month
	return new Date(yearNumber, monthNumber + 1, 0).getDate();
};

export const getFirstWeekDayNumberOfMonth = (yearNumber, monthNumber) => {
	if (typeof yearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;
	return new Date(yearNumber, monthNumber).getDay();
};

export const getLastWeekDayNumberOfMonth = (yearNumber, monthNumber) => {
	if (typeof yearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;
	// zero day number means the last day from the previous month
	return new Date(yearNumber, monthNumber + 1, 0).getDay();
};

export const getPreviousMonthDayNumbers = (yearNumber, monthNumber) => {
	if (typeof yearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;

	let firstWeekDayNumber = getFirstWeekDayNumberOfMonth(
		yearNumber,
		monthNumber
	);
	let lastDateOfPrevMonth = getLastDateOfMonth(yearNumber, monthNumber - 1);

	let result = [];

	for (let i = firstWeekDayNumber; i > 0; i--) {
		result.push(lastDateOfPrevMonth - i + 1);
	}

	return result;
};

export const getCurrentMonthDayNumbers = (yearNumber, monthNumber) => {
	if (typeof yearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;
	const lastDateOfMonth = getLastDateOfMonth(yearNumber, monthNumber);

	const result = [];

	for (let i = 1; i <= lastDateOfMonth; i++) {
		result.push(i);
	}

	return result;
};

export const getNextMonthDayNumbers = (yearNumber, monthNumber) => {
	if (typeof yearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;

	let lastWeekDayNumber = getLastWeekDayNumberOfMonth(
		yearNumber,
		monthNumber
	);

	let prevMonthDays = getPreviousMonthDayNumbers(yearNumber, monthNumber);
	let currentMonthDays = getCurrentMonthDayNumbers(yearNumber, monthNumber);
	let previousDaysCount = prevMonthDays.length + currentMonthDays.length;

	//week days start with zero: 0,1,2,3,4,5,6
	const nextMonthDaysCountInLastWeek = 6 - lastWeekDayNumber;
	let result = [];

	for (let i = 1; i <= nextMonthDaysCountInLastWeek; i++) {
		result.push(i);
	}

	//generate additional full week from the next month
	if (previousDaysCount <= 35) {
		for (let j = 1; j <= 7; j++) {
			result.push(nextMonthDaysCountInLastWeek + j);
		}
	}

	return result;
};

export const isWeekend = (yearNumber, monthNumber, dateNumber) => {
	if (
		typeof yearNumber !== 'number' ||
		typeof monthNumber !== 'number' ||
		typeof dateNumber !== 'number'
	)
		return null;

	const date = new Date(yearNumber, monthNumber, dateNumber);
	// 0 - Sunday, 6 - Saturday
	return date.getDay() === 0 || date.getDay() === 6;
};

export const getDays = (yearNumber, monthNumber) => {
	if (typeof yearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;

	let result = [];
	const prevMonthDayNumbers = getPreviousMonthDayNumbers(
		yearNumber,
		monthNumber
	);
	const currentMonthDayNumbers = getCurrentMonthDayNumbers(
		yearNumber,
		monthNumber
	);
	const nextMonthDayNumbers = getNextMonthDayNumbers(yearNumber, monthNumber);

	prevMonthDayNumbers.forEach((number) => {
		result.push({
			number,
			isFromPrevOrNextMonth: true,
			isWeekend: isWeekend(yearNumber, monthNumber - 1, number),
		});
	});
	currentMonthDayNumbers.forEach((number) => {
		result.push({
			number,
			isWeekend: isWeekend(yearNumber, monthNumber, number),
		});
	});
	nextMonthDayNumbers.forEach((number) => {
		result.push({
			number,
			isFromPrevOrNextMonth: true,
			isWeekend: isWeekend(yearNumber, monthNumber + 1, number),
		});
	});

	return result;
};
