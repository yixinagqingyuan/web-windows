<template>
	<div class="App">
		<background />
		<div class="desktop">
			<DesktopApp />
		</div>
		<!-- <router-view></router-view> -->
		<Taskbar />
	</div>
</template>

<script lang="ts">
	import background from './components/background/index.vue';
	import start from './components/start/index';
	import Taskbar from './components/taskbar/index.vue';
	import { defineComponent } from 'vue';
	const { DesktopApp } = start;
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

