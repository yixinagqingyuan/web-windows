<template>
	<background />
	<router-view></router-view>
</template>

<script lang="ts">
	import background from './components/background/index.vue';
	import { defineComponent, ref } from 'vue';
	const a = ref({ a: 1 });
	console.log(a.value.a);
	export default defineComponent({
		name: 'App',
		components: {
			background,
		},
	});
</script>

