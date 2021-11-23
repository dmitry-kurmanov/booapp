<script>
	import Calendar from '../Calendar/Calendar.svelte';
	export let json = {};
</script>

<div class="booapp">
	<Calendar dateString={json.dateString} />
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
		justify-content: center;
		align-items: center;
		width: 100%;
		font-size: 14px;
	}
</style>
