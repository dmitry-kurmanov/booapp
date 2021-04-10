<script>
	import { monthsNames, weekDays } from '../strings';
	import {
		getLastDateOfMonth,
		getFirstWeekDayNumberOfMonth,
		getLastWeekDayNumberOfMonth,
		getPreviousMonthDaysNumbers,
		getMonthDaysNumbers,
		getNextMonthDaysNumbers,
	} from '../core';

	export let dateInstance = new Date();

	const yearNumber = dateInstance.getFullYear();

	const monthNumber = dateInstance.getMonth();
	const monthName = monthsNames[monthNumber];
	const dateString = dateInstance.toDateString();

	const firstWeekDayNumber = getFirstWeekDayNumberOfMonth(
		yearNumber,
		monthNumber
	);
	const lastDateOfPrevMonth = getLastDateOfMonth(yearNumber, monthNumber - 1);
	let prevMonthDays = getPreviousMonthDaysNumbers(
		firstWeekDayNumber,
		lastDateOfPrevMonth
	);

	const lastDateOfMonth = getLastDateOfMonth(yearNumber, monthNumber);
	let days = getMonthDaysNumbers(lastDateOfMonth);

	const lastWeekDayNumber = getLastWeekDayNumberOfMonth(
		yearNumber,
		monthNumber
	);
	let nextMonthDays = getNextMonthDaysNumbers(lastWeekDayNumber);
</script>

<div class="booapp-calendar">
	<div class="booapp-calendar__header">
		<div>{monthName}</div>
		<div>{dateString}</div>
	</div>

	<div class="booapp-calendar_days">
		{#each prevMonthDays as day}
			<div class="booapp-calendar_day booapp-calendar_day--prev-month">
				{day}
			</div>
		{/each}

		{#each days as day}
			<div class="booapp-calendar_day">
				{day}
			</div>
		{/each}

		{#each nextMonthDays as day}
			<div class="booapp-calendar_day booapp-calendar_day--next-month">
				{day}
			</div>
		{/each}
	</div>
</div>

<style lang="scss" global>
	.booapp-calendar_day--prev-month,
	.booapp-calendar_day--next-month {
		opacity: 0.5;
	}
</style>
