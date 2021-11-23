import BooApp from './components/BooApp/BooApp.svelte';

export class Model {
	constructor(json) {
		this.json = json;
		this.instance = null;
	}

	render(domNode) {
		if (!domNode) return;

		if (this.instance) this.instance.$destroy();

		this.instance = new BooApp({
			target: domNode,
			props: {
				json: this.json,
			},
		});
	}
}
