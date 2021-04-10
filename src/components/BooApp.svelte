<script>
	import Calendar from './Calendar.svelte';
</script>

<div class="booapp">
	<Calendar />
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
		height: 100vh;
	}
</style>
