import {
	buildFirstWeek,
	buildWeek,
	buildLastWeek,
	buildNextWeek,
} from '../src/core.js';

test('buildFirstWeek', () => {
	const firstDay = 5; //friday
	const week = buildFirstWeek(firstDay);
});
