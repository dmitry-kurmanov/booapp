import Calendar from './Calendar.svelte';

export default {
	title: 'Example/Calendar',
	component: Calendar,
	argTypes: {
		dateString: { control: 'text' },
	},
};

const Template = ({ ...args }) => ({
	Component: Calendar,
	props: args,
});

export const Main = Template.bind({});
Main.args = {};

export const PresetDate = Template.bind({});
PresetDate.args = {
	dateString: '2021-04-27',
};
