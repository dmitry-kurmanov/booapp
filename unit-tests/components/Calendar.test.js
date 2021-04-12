import { Calendar } from './testbuild.js';

test('monthNumber', () => {
	const calendar = new Calendar({
		target: document.body,
		props: {},
	});
	const currentMonth = new Date().getMonth();

	expect(calendar.monthNumber).toEqual(currentMonth);
});

test('yearNumber', () => {
	const calendar = new Calendar({
		target: document.body,
		props: {},
	});
	const currentYear = new Date().getFullYear();

	expect(calendar.yearNumber).toEqual(currentYear);
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
	expect(calendar.yearNumber).toEqual(currentYear);
	expect(calendar.monthNumber).toEqual(currentMonth + 1);

	calendar.monthNumber = 11;

	calendar.goToNextMonth();
	expect(calendar.yearNumber).toEqual(currentYear + 1);
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
	expect(calendar.yearNumber).toEqual(currentYear);
	expect(calendar.monthNumber).toEqual(currentMonth - 1);

	calendar.monthNumber = 0;

	calendar.goToPrevMonth();
	expect(calendar.yearNumber).toEqual(currentYear - 1);
	expect(calendar.monthNumber).toEqual(11);
});
