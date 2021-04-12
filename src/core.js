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

export const getPreviousMonthDaysNumbers = (yearNumber, monthNumber) => {
	let firstWeekDayNumber = getFirstWeekDayNumberOfMonth(
		yearNumber,
		monthNumber
	);
	let lastDateOfPrevMonth = getLastDateOfMonth(yearNumber, monthNumber - 1);

	if (
		typeof firstWeekDayNumber !== 'number' ||
		typeof lastDateOfPrevMonth !== 'number'
	)
		return null;

	let result = [];

	for (let i = firstWeekDayNumber; i > 0; i--) {
		result.push(lastDateOfPrevMonth - i + 1);
	}

	return result;
};

export const getMonthDaysNumbers = (yearNumber, monthNumber) => {
	const lastDateOfMonth = getLastDateOfMonth(yearNumber, monthNumber);

	if (typeof lastDateOfMonth !== 'number') return null;

	const result = [];

	for (let i = 1; i <= lastDateOfMonth; i++) {
		result.push(i);
	}

	return result;
};

export const getNextMonthDaysNumbers = (yearNumber, monthNumber) => {
	let lastWeekDayNumber = getLastWeekDayNumberOfMonth(
		yearNumber,
		monthNumber
	);

	if (typeof lastWeekDayNumber !== 'number') return null;

	//week days start with zero: 0,1,2,3,4,5,6
	const nextMonthDaysCount = 6 - lastWeekDayNumber;
	let result = [];

	for (let i = 1; i <= nextMonthDaysCount; i++) {
		result.push(i);
	}

	return result;
};
