<template>
	<div className="background" :style="{ backgroundImage: 'url(/img/wallpaper/ThemeA/img0.jpg)' }">
		111
	</div>
</template>
<script lang="ts">
	import { defineComponent, ref } from 'vue';
	export default defineComponent({
		setup() {
			const bgImg = [];
			return {};
		},
	});
</script>
<style lang="scss"  scoped>
	.background {
		min-width: 100vw;
		min-height: 100vh;
		background-color: #fefefe;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>