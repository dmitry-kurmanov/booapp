export const getLastDateOfMonth = (fullYearNumber, monthNumber) => {
	if (typeof fullYearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;
	// zero day number means the last day from the previous month
	return new Date(fullYearNumber, monthNumber + 1, 0).getDate();
};

export const getFirstWeekDayNumberOfMonth = (fullYearNumber, monthNumber) => {
	if (typeof fullYearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;
	return new Date(fullYearNumber, monthNumber).getDay();
};

export const getLastWeekDayNumberOfMonth = (fullYearNumber, monthNumber) => {
	if (typeof fullYearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;
	// zero day number means the last day from the previous month
	return new Date(fullYearNumber, monthNumber + 1, 0).getDay();
};

export const getPreviousMonthDayNumbers = (fullYearNumber, monthNumber) => {
	if (typeof fullYearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;

	let firstWeekDayNumber = getFirstWeekDayNumberOfMonth(
		fullYearNumber,
		monthNumber
	);
	let lastDateOfPrevMonth = getLastDateOfMonth(fullYearNumber, monthNumber - 1);

	let result = [];

	for (let i = firstWeekDayNumber; i > 0; i--) {
		result.push(lastDateOfPrevMonth - i + 1);
	}

	return result;
};

export const getCurrentMonthDayNumbers = (fullYearNumber, monthNumber) => {
	if (typeof fullYearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;
	const lastDateOfMonth = getLastDateOfMonth(fullYearNumber, monthNumber);

	const result = [];

	for (let i = 1; i <= lastDateOfMonth; i++) {
		result.push(i);
	}

	return result;
};

export const getNextMonthDayNumbers = (fullYearNumber, monthNumber) => {
	if (typeof fullYearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;

	let lastWeekDayNumber = getLastWeekDayNumberOfMonth(
		fullYearNumber,
		monthNumber
	);

	let prevMonthDays = getPreviousMonthDayNumbers(fullYearNumber, monthNumber);
	let currentMonthDays = getCurrentMonthDayNumbers(fullYearNumber, monthNumber);
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

export const isWeekend = (fullYearNumber, monthNumber, dateNumber) => {
	if (
		typeof fullYearNumber !== 'number' ||
		typeof monthNumber !== 'number' ||
		typeof dateNumber !== 'number'
	)
		return null;

	const date = new Date(fullYearNumber, monthNumber, dateNumber);
	// 0 - Sunday, 6 - Saturday
	return date.getDay() === 0 || date.getDay() === 6;
};

export const getDays = (fullYearNumber, monthNumber) => {
	if (typeof fullYearNumber !== 'number' || typeof monthNumber !== 'number')
		return null;

	let result = [];
	const prevMonthDayNumbers = getPreviousMonthDayNumbers(
		fullYearNumber,
		monthNumber
	);
	const currentMonthDayNumbers = getCurrentMonthDayNumbers(
		fullYearNumber,
		monthNumber
	);
	const nextMonthDayNumbers = getNextMonthDayNumbers(fullYearNumber, monthNumber);

	prevMonthDayNumbers.forEach((number) => {
		result.push({
			number,
			isFromPrevOrNextMonth: true,
			isWeekend: isWeekend(fullYearNumber, monthNumber - 1, number),
		});
	});
	currentMonthDayNumbers.forEach((number) => {
		result.push({
			number,
			isWeekend: isWeekend(fullYearNumber, monthNumber, number),
		});
	});
	nextMonthDayNumbers.forEach((number) => {
		result.push({
			number,
			isFromPrevOrNextMonth: true,
			isWeekend: isWeekend(fullYearNumber, monthNumber + 1, number),
		});
	});

	return result;
};
