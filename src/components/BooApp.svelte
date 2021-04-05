<script>
	export let days = [];
	const currentDate = new Date();

	const daysInMonth = (month, year) => {
		// Use 0 for January, 1 for February, etc.
		return new Date(year, month + 1, 0).getDate();
	};

	const generateDays = (currentDate) => {
		let days = [];
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();
		const daysCount = daysInMonth(month, year);

		const weekday = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		for (let index = 1; index <= daysCount; index++) {
			let date = new Date(year, month, index);

			days = [
				...days,
				{
					number: index,
					weekday: weekday[date.getDay()],
					isCurrent: currentDate.getDate() === index,
				},
			];
		}

		return days;
	};

	days = generateDays(currentDate);
</script>

<div>
	<h1>BooApp Calendar</h1>

	<div>
		{#each days as day}
			<div
				class="booapp__day"
				class:booapp__day--current={day.isCurrent}
			>
				{day.number}
				{day.weekday}
			</div>
		{/each}
	</div>
</div>

<style lang="scss" global>
	.booapp-hide {
		display: none;
	}
	.booapp__day {
		display: inline-block;
		padding: 15px;
	}

	.booapp__day--current {
		background-color: tomato;
		color: white;
	}
</style>
