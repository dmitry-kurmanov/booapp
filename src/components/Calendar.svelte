<script>
	import { monthsNames, weekDaysNames } from '../strings';
	import {
		getPreviousMonthDaysNumbers,
		getCurrentMonthDaysNumbers,
		getNextMonthDaysNumbers,
		isToday,
		isWeekend,
	} from '../core';

	const dateInstance = new Date();

	export let yearNumber = dateInstance.getFullYear();
	export let monthNumber = dateInstance.getMonth();
	export const goToNextMonth = () => {
		monthNumber++;
		if (monthNumber > 11) {
			yearNumber++;
			monthNumber = 0;
		}
	};
	export const goToPrevMonth = () => {
		monthNumber--;
		if (monthNumber < 0) {
			yearNumber--;
			monthNumber = 11;
		}
	};

	$: monthName = monthsNames[monthNumber];
	$: prevMonthDays = getPreviousMonthDaysNumbers(yearNumber, monthNumber);
	$: currentMonthDays = getCurrentMonthDaysNumbers(yearNumber, monthNumber);
	$: nextMonthDays = getNextMonthDaysNumbers(yearNumber, monthNumber);
</script>

<div class="booapp-calendar">
	<div class="booapp-calendar__header">
		<button
			class="booapp-calendar__prev-month-btn"
			on:click={goToPrevMonth}
		>
			&#8592; Prev
		</button>

		<div class="booapp-calendar__header-info">{monthName} {yearNumber}</div>

		<button
			class="booapp-calendar__next-month-btn"
			on:click={goToNextMonth}
		>
			&#8594; Next
		</button>
	</div>

	<div class="booapp-calendar__weekdays">
		{#each weekDaysNames as weekDayName}
			<div class="booapp-calendar__weekday">
				{weekDayName}
			</div>
		{/each}
	</div>

	<div class="booapp-calendar__days">
		{#each prevMonthDays as day}
			<div
				class="booapp-calendar__day booapp-calendar__day--prev-month"
				class:booapp-calendar__day--weekend={isWeekend(
					yearNumber,
					monthNumber - 1,
					day
				)}
			>
				{day}
			</div>
		{/each}

		{#each currentMonthDays as day}
			<div
				class="booapp-calendar__day"
				class:booapp-calendar__day--weekend={isWeekend(
					yearNumber,
					monthNumber,
					day
				)}
				class:booapp-calendar__day--today={isToday(
					yearNumber,
					monthNumber,
					day
				)}
			>
				{day}
			</div>
		{/each}

		{#each nextMonthDays as day}
			<div
				class="booapp-calendar__day booapp-calendar__day--next-month"
				class:booapp-calendar__day--weekend={isWeekend(
					yearNumber,
					monthNumber + 1,
					day
				)}
			>
				{day}
			</div>
		{/each}
	</div>
</div>

<style lang="scss" global>
	.booapp-calendar {
		width: 45rem;
		height: 44rem;
		box-shadow: 0 0.5rem 3rem rgba(0, 0, 0, 0.4);
	}

	.booapp-calendar__header {
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.2rem;
		display: flex;
		justify-content: center;
		height: 5rem;
		align-items: center;
	}

	.booapp-calendar__header-info {
		font-size: 2rem;
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.booapp-calendar__prev-month-btn,
	.booapp-calendar__next-month-btn {
		background-color: white;
		color: tomato;
		border: 1px solid tomato;
		border-radius: 50px;
		outline: none;
		padding: 1rem;
		margin: 0 2rem;
		font-weight: bold;
		cursor: pointer;
		flex-basis: 10em;
		flex-shrink: 0;
		&:hover {
			box-shadow: 0 0 3px 1px tomato;
		}
	}

	.booapp-calendar__day--prev-month,
	.booapp-calendar__day--next-month {
		opacity: 0.5;
	}

	.booapp-calendar__weekdays {
		width: 100%;
		height: 5rem;
		padding: 0 0.4rem;
		display: flex;
		align-items: center;
	}
	.booapp-calendar__weekday {
		font-size: 1.5rem;
		font-weight: 400;
		letter-spacing: 0.1rem;
		width: calc(44.2rem / 7);
		display: flex;
		justify-content: center;
		align-items: center;
		text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
	}

	.booapp-calendar__days {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 0.2rem;
	}

	.booapp-calendar__day {
		font-size: 1.4rem;
		margin: 0.3rem;
		width: calc(40.2rem / 7);
		height: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
		transition: background-color 0.2s;
	}

	.booapp-calendar__day:hover:not(.booapp-calendar__day--today) {
		border: 0.2rem solid tomato;
		cursor: pointer;
	}
	.booapp-calendar__day--today {
		color: #fff;
		background-color: tomato;
	}

	.booapp-calendar__day--weekend {
		color: tomato;
	}
</style>
