<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Calendar from './Calendar.svelte';
</script>

<Meta
	title="Example/Calendar"
	component={Calendar}
	argTypes={{
		label: { control: 'text' },
		primary: { control: 'boolean' },
		backgroundColor: { control: 'color' },
		size: {
			control: { type: 'select', options: ['small', 'medium', 'large'] },
		},
		onClick: { action: 'onClick' },
	}}
/>

<Template let:args>
	<Calendar {...args} on:click={args.onClick} />
</Template>

<Story
	name="Primary"
	args={{
		currentDateString: '2021-04-27',
	}}
/>
