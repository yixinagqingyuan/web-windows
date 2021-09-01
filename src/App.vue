<template>
	<div class="App">
		<background />
		<div class="desktop">
			<DesktopApp />
		</div>
		<router-view></router-view>
		<Taskbar />
	</div>
</template>

<script lang="ts">
	import background from './components/background/index.vue';
	import start from './components/start/index';
	import Taskbar from './components/taskbar/index.vue';
	import { defineComponent, ref } from 'vue';
	const { DesktopApp } = start;
	const a = ref({ a: 1 });
	console.log(a.value.a);
	export default defineComponent({
		name: 'App',
		components: {
			background,
			DesktopApp,
			Taskbar,
		},
	});
</script>
<style lang="scss" scoped>
</style>

