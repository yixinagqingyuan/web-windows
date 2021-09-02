<template>
	<div class="taskbar">
		<div class="taskcont">
			<div class="tasksCont" data-menu="task" :data-side="tasks.align">
				<div class="tsbar">
					<icon class="tsIcon" src="home" width="22" click="STARTOGG" />
					<template v-if="tasks.search">
						<icon class="tsIcon" src="search" width="22" click="STARTSRC" />
					</template>
					<template v-if="tasks.widgets">
						<icon class="tsIcon" src="widget" width="22" click="WIDGTOGG" />
					</template>
					<div v-for="(task, index) in tasks.apps" :value="task.icon">
						<icon
							class="tsIcon"
							:key="index"
							:open="apps[task.icon].hide ? null : true"
							:active="apps[task.icon].z == apps.hz"
							:click="task.action"
							:src="task.icon"
							payload="togg"
							width="22"
						/>
					</div>
				</div>
			</div>
			<div class="taskright">
				<icon class="taskIcon" fafa="chevron-up" width="10" />
				<icon class="taskIcon" src="wifi" ui width="14" />
				<icon class="taskIcon" src="battery" ui width="16" />
				<icon class="taskIcon" src="audio" ui width="22" />
				<div class="taskDate handcr prtclk hvdark" data-action="CALNTOGG">
					<div>
						{{ new Date().toLocaleDateString() }}
					</div>
					<div>
						{{ new Date().toLocaleTimeString() }}
					</div>
				</div>
				<icon class="taskIcon mr-2 hvdark" ui src="sidepane" width="16" invert click="PANETOGG" />
				<icon class="graybd" ui width="6" click="SHOWDSK" pr />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { mapGetters } from 'vuex';
	import general from '../../components/general';
	const { icon } = general;
	export default defineComponent({
		name: 'taskbar',
		components: {
			icon,
		},
		computed: {
			...mapGetters(['tasks', 'apps']),
		},
		setup() {},
		methods: {},
	});
</script>

<style lang="scss" scoped>
	.taskbar {
		position: absolute;
		width: 100vw;
		height: 39px;
		background: rgba(254, 254, 254, 0.8);
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(20px);
		bottom: 0;
		z-index: 10000;
	}

	.taskcont {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.taskright {
		position: absolute;
		top: 0;
		right: 0;
		width: auto;
		height: 100%;
		margin-left: 10px;
		display: flex;
	}

	.taskIcon {
		width: 24px;

		svg {
			color: #303030;
		}
	}

	.taskDate {
		min-width: 44px;
		height: 100%;
		display: flex;
		padding: 6px 8px 6px 6px;
		font-size: 0.64em;
		flex-direction: column;

		div {
			width: 100%;
			text-align: right;
			font-weight: 400;
		}
	}

	.tasksCont {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		&[data-side='center'] {
			align-items: center;
		}

		&[data-side='left'] {
			align-items: flex-start;
		}
	}

	.tsbar {
		width: auto;
		height: 100%;
		display: flex;
		align-items: center;
		transition: all ease-in-out 200ms;
	}

	.tsIcon {
		position: relative;
		width: 33px;
		height: 33px;
		margin: auto 3px;
		box-sizing: border-box;
		border-radius: 0;
		background: rgba(254, 254, 254, 0);
		transform-origin: center;
		animation: popintro 800ms ease-in-out;

		&:hover {
			background: rgba(#fefefe, 0.64);
			border-radius: 4px;
			transition: all ease-in-out 200ms;
		}

		&[data-open='true']:after {
			content: '';
			position: absolute;
			display: block;
			bottom: 0;
			width: 6px;
			height: 3px;
			border-radius: 4px;
			background: #858585;
		}

		&[data-active='true']:after {
			width: 12px;
			background: #1f4dcd;
		}
	}

	.graybd {
		border: solid 1px #c3c3c3;
		border-width: 0 0 0 2px;
	}

	@keyframes popintro {
		0% {
			transform: scale(0);
		}
		40% {
			transform: scale(1.125);
		}
		70% {
			transform: scale(0.725);
		}
		100% {
			transform: scale(1);
		}
	}
</style>