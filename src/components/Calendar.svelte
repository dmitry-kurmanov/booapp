<script>
	import { monthNames, weekDayNames, weekDayShortNames } from '../strings';
	import { getDays } from '../core';

	export let currentDateString = null;

	let currentDateInstance = new Date();
	$: currentDateInstance = currentDateString
		? new Date(currentDateString)
		: new Date();

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
	export let yearNumber = currentDateInstance.getFullYear();
	export let monthNumber = currentDateInstance.getMonth();

	export const selectDate = (newDateNumber) => {
		selectedDateNumber = newDateNumber;
		selectedMonthNumber = monthNumber;
	};
	let selectedMonthNumber = currentDateInstance.getMonth();
	let selectedDateNumber = currentDateInstance.getDate();
	function isSelectedDate(dateNumber) {
		return (
			selectedMonthNumber === monthNumber &&
			selectedDateNumber === dateNumber
		);
	}

	$: monthName = monthNames[monthNumber];
	$: days = getDays(yearNumber, monthNumber);
	$: currentWeekDay =
		weekDayNames[
			new Date(yearNumber, monthNumber, selectedDateNumber).getDay()
		];
</script>

<div class="booapp-calendar">
	<div class="booapp-calendar__header">
		<button
			class="booapp-calendar__go-to-prev-month"
			on:click={goToPrevMonth}
		>
			&#8592; Prev
		</button>

		<div class="booapp-calendar__header-info">
			{monthName}
			{yearNumber}
			{currentWeekDay}
		</div>

		<button
			class="booapp-calendar__go-to-next-month"
			on:click={goToNextMonth}
		>
			&#8594; Next
		</button>
	</div>

	<div class="booapp-calendar__weekdays">
		{#each weekDayShortNames as weekDayShortName}
			<div class="booapp-calendar__weekday">
				{weekDayShortName}
			</div>
		{/each}
	</div>

	<div class="booapp-calendar__days">
		{#each days as day}
			<div
				on:click={selectDate(day.number)}
				class="booapp-calendar__day"
				class:booapp-calendar__day--prev-or-next-month={day.isFromPrevOrNextMonth}
				class:booapp-calendar__day--weekend={day.isWeekend}
				class:booapp-calendar__day--selected-day={!day.isFromPrevOrNextMonth &&
					isSelectedDate(day.number)}
			>
				{day.number}
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

	.booapp-calendar * {
		box-sizing: border-box;
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
	.booapp-calendar__go-to-prev-month,
	.booapp-calendar__go-to-next-month {
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

	.booapp-calendar__day--prev-or-next-month {
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

	.booapp-calendar__day:hover:not(.booapp-calendar__day--selected-day) {
		border: 0.2rem solid tomato;
		cursor: pointer;
	}
	.booapp-calendar__day--selected-day {
		color: #fff;
		background-color: tomato;
	}

	.booapp-calendar__day--weekend {
		color: tomato;
	}

	.booapp-calendar__day--selected-day.booapp-calendar__day--weekend {
		color: white;
	}
</style>
