<template>
	<div class="App">
		<background />
		<div class="desktop">
			<DesktopApp />
			<WidPane />
		</div>
		<!-- <router-view></router-view> -->
		<Taskbar />
	</div>
</template>

<script lang="ts">
	import background from './components/background/index.vue';
	import { DesktopApp, WidPane } from './components/start/index';
	import Taskbar from './components/taskbar/index.vue';
	import { defineComponent } from 'vue';
	export default defineComponent({
		name: 'App',
		components: {
			background,
			DesktopApp,
			Taskbar,
			WidPane,
		},
	});
</script>
<style lang="scss" scoped>
</style>

