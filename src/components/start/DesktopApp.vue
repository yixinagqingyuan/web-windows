<template>
	<div
		class="desktopCont"
		style="
			grid-template-columns: repeat(auto-fit, 90px);
			grid-template-rows: repeat(auto-fit, 98px);
		"
	></div>
</template>
<script lang="ts">
	import { desktopApps } from '../../utils';
	import { defineComponent } from 'vue';
	import general from '../general/index';
	const { icon } = general;
	const defState = {
		apps: desktopApps,
		hide: false,
		size: 1,
		sort: 'none',
		abOpen: false,
	};
	export default defineComponent({
		setup() {},
		components: {
			icon,
		},
	});
</script>
<style lang="scss" scoped>
	.desktopCont {
		width: fit-content;
		height: 100%;
		display: grid;
		grid-auto-flow: column;
		align-content: space-evenly;
	}
</style>
