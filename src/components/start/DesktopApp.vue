<template>
	<div
		class="desktopCont"
		:style="{
			gridTemplateColumns: `repeat(auto-fit, ${Math.round(deskApps.size * 90)}px)`,
			gridTemplateRows: `repeat(auto-fit, ${Math.round(deskApps.size * 98)}px)`,
		}"
	>
		<template v-if="!deskApps.hide">
			<div class="dskApp" :key="index" v-for="(app, index) in deskApps.apps">
				<Icon
					:click="app.action"
					:width="Math.round(deskApps.size * 36)"
					class="dskIcon"
					:src="app.icon"
					:payload="app.payload || 'full'"
				/>
				<div className="appName">{{ app.name }}</div>
			</div>
		</template>
		<StartMenu></StartMenu>
	</div>
</template>
<script lang="ts">
	import { defineComponent } from 'vue';
	import { mapGetters } from 'vuex';
	import { Icon } from '../general/index';
	import StartMenu from './StartMenu.vue';
	export default defineComponent({
		setup() {},
		components: {
			Icon,
			StartMenu,
		},
		computed: {
			...mapGetters(['deskApps']),
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
	.dskApp {
		margin: 4px;
		padding: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 0.8em;
		transition: all ease-in-out 200ms;

		&:hover {
			background: rgba(255, 255, 255, 0.25);
		}

		.appName {
			text-align: center;
			color: #fafafa;
			margin: 4px 0;
			text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
		}
	}
</style>
