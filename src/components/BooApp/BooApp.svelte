<script>
	import Calendar from '../Calendar/Calendar.svelte';
	export let json = {};
</script>

<div class="booapp">
	<Calendar selectedDateString={json.selectedDateString} />
</div>

<style lang="scss" global>
	.booapp,
	.booapp * {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: sans-serif;
	}
	.booapp {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		font-size: 14px;
	}
</style>
