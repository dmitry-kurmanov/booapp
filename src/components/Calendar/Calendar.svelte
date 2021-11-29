<script>
	import { monthNames, weekDayNames, weekDayShortNames } from '../../strings';
	import { getDays, isDateInstancesEqual } from '../../utils/core';

	export let selectedDateString = null;
	export let selectedDateInstance = new Date();
	export let currentFullYearNumber;
	export let selectedMonthNumber;

	export const goToNextMonth = () => {
		selectedMonthNumber++;
		if (selectedMonthNumber > 11) {
			currentFullYearNumber++;
			selectedMonthNumber = 0;
		}
	};
	export const goToPrevMonth = () => {
		selectedMonthNumber--;
		if (selectedMonthNumber < 0) {
			currentFullYearNumber--;
			selectedMonthNumber = 11;
		}
	};

	export const selectDate = (fullYearNumber, monthNumber, dateNumber) => {
		if (
			typeof fullYearNumber !== 'number' ||
			typeof monthNumber !== 'number' ||
			typeof dateNumber !== 'number'
		)
			return;

		selectedDateInstance.setFullYear(fullYearNumber);
		selectedDateInstance.setMonth(monthNumber);
		selectedDateInstance.setDate(dateNumber);

		selectedDateInstance = selectedDateInstance; //svelte update hack
	};

	let currentDateInstance = new Date();

	$: {
		if (selectedDateString)
			currentDateInstance = new Date(selectedDateString);
	}

	$: currentFullYearNumber = currentDateInstance.getFullYear();
	$: currentMonthName = monthNames[currentDateInstance.getMonth()];
	$: currentWeekDayName = weekDayNames[currentDateInstance.getDay()];

	$: selectedMonthNumber = currentDateInstance.getMonth();
	$: selectedMonthName = monthNames[selectedMonthNumber];

	$: selectedWeekDayName = weekDayNames[selectedDateInstance.getDay()];

	$: days = getDays(currentFullYearNumber, selectedMonthNumber);

	$: isCurrentdDate = (fullYearNumber, monthNumber, dateNumber) => {
		return (
			currentDateInstance.getFullYear() === fullYearNumber &&
			currentDateInstance.getMonth() === monthNumber &&
			currentDateInstance.getDate() === dateNumber
		);
	};

	$: isSelectedDate = (fullYearNumber, monthNumber, dateNumber) => {
		return (
			selectedDateInstance.getFullYear() === fullYearNumber &&
			selectedDateInstance.getMonth() === monthNumber &&
			selectedDateInstance.getDate() === dateNumber
		);
	};
</script>

<div class="booapp-calendar-current-date">
	{currentWeekDayName}, {currentMonthName}
	{currentDateInstance.getDate()}, {currentFullYearNumber}
</div>

<div class="booapp-calendar">
	<div class="booapp-calendar__header">
		<button
			class="booapp-calendar__go-to-prev-month"
			on:click={goToPrevMonth}
		>
			&#8592; Prev
		</button>

		<div class="booapp-calendar__header-info">
			{selectedMonthName}
			{currentFullYearNumber}
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
				on:click={selectDate(
					currentFullYearNumber,
					day.monthNumber,
					day.number
				)}
				class="booapp-calendar__day"
				class:booapp-calendar__day--prev-or-next-month={day.isFromPrevOrNextMonth}
				class:booapp-calendar__day--weekend={day.isWeekend}
				class:booapp-calendar__day--current={!day.isFromPrevOrNextMonth &&
					isCurrentdDate(
						currentFullYearNumber,
						selectedMonthNumber,
						day.number
					)}
				class:booapp-calendar__day--selected={isSelectedDate(
					currentFullYearNumber,
					day.monthNumber,
					day.number
				)}
			>
				{day.number}
			</div>
		{/each}
	</div>
</div>

<div class="booapp-calendar-selected-date">
	{#if isDateInstancesEqual(selectedDateInstance, currentDateInstance)}
		today
	{:else}
		{selectedWeekDayName} {selectedDateInstance.getDate()}
	{/if}
</div>

<style lang="scss" global>
	.booapp-calendar-current-date,
	.booapp-calendar-selected-date {
		font-size: 20px;
	}
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

	.booapp-calendar__day:hover:not(.booapp-calendar__day--current) {
		border: 0.2rem solid tomato;
		cursor: pointer;
	}
	.booapp-calendar__day--current {
		color: #fff;
		background-color: tomato;
	}

	.booapp-calendar__day--selected {
		border: 0.2rem solid tomato;
		opacity: 1;

		&.booapp-calendar__day--current {
			&:hover {
				border: 0.2rem solid black;
			}
			border: 0.2rem solid black;
		}
	}

	.booapp-calendar__day--weekend {
		color: tomato;
	}

	.booapp-calendar__day--current.booapp-calendar__day--weekend {
		color: white;
	}
</style>
