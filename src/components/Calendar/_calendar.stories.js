import Calendar from './Calendar.svelte';

export default {
	title: 'Example/Calendar',
	component: Calendar,
	argTypes: {
		selectedDateString: { control: 'text' },
	},
};

const Template = ({ ...args }) => ({
	Component: Calendar,
	props: args,
});

export const Main = Template.bind({});
Main.args = {
	selectedDateString: '2021-04-27',
};

export const PresetDate = Template.bind({});
PresetDate.args = {
	selectedDateString: '2021-04-27',
};
