<script>
	export let days = [];
	const todayDate = new Date();

	const daysInMonth = (month, year) => {
		// Use 0 for January, 1 for February, etc.
		return new Date(year, month + 1, 0).getDate();
	};

	const isWeekend = (dayNumber) => {
		return dayNumber % 7 === 0 || dayNumber % 7 === 6;
	};

	const isToday = (dayNumber) => {
		return todayDate.getDate() === dayNumber;
	};

	const getDayCssClasses = (dayNumber) => {
		let base = 'booapp-calendar__day';
		let today = isToday(dayNumber) ? base + '--today' : '';
		let weekend = isWeekend(dayNumber) ? base + '--weekend' : '';
		return `${base} ${weekend} ${today}`;
	};

	const generateDays = (todayDate) => {
		let result = [];
		let days = [];
		const month = todayDate.getMonth();
		const year = todayDate.getFullYear();
		const daysCount = daysInMonth(month, year);
		const firstDayNumber = new Date(year, month, 1).getDay();

		const weekday = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		for (let dayNumber = 1; dayNumber <= daysCount; dayNumber++) {
			let date = new Date(year, month, dayNumber);

			days[firstDayNumber + dayNumber] = {
				number: dayNumber,
				weekday: weekday[date.getDay()],
			};
		}

		for (let i = 0; i <= days.length; i++) {
			let day = days[i];
			if (!day) {
				result.push({ number: i, weekday: 'aaaaaa' });
			} else {
				result.push(day);
			}
		}
		return result;
	};

	days = generateDays(todayDate);
</script>

<div>
	<h1>BooApp Calendar</h1>

	<div class="booapp-calendar">
		{#each days as day}
			<div class={getDayCssClasses(day.number)}>
				{day.number}
				{day.weekday}
			</div>
		{/each}
	</div>
</div>

<style lang="scss" global>
	.booapp-calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(5, 1fr);
		height: 500px;
	}
	.booapp-calendar__day {
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid gray;
	}

	.booapp-calendar__day--today {
		border: 1px solid tomato;
	}

	.booapp-calendar__day--weekend {
		color: blue;
	}
</style>
