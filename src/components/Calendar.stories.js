import Calendar from './Calendar.svelte';

export default {
	title: 'Example/Calendar',
	component: Calendar,
	argTypes: {
		currentDateString: { control: 'text' },
	},
};

const Template = ({ ...args }) => ({
	Component: Calendar,
	props: args,
});

export const Main = Template.bind({});
Main.args = {
	currentDateString: '2021-04-27',
};
