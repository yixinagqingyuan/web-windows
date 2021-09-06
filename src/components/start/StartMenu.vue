<template>
	<transition>
		<div class="startMenu dpShad" :data-hide="start.hide" :data-align="align">
			<transition>
				<div v-if="start.menu" class="menuBox">
					<div class="stmenu" :data-allapps="start.showAll">
						<div class="menuUp">
							<div class="pinnedApps">
								<div class="stAcbar">
									<div class="gpname">常用应用</div>
									<div class="gpbtn prtclk" data-action="STARTALL">
										<div>所有应用</div>
										<icon fafa="chevron-right" width="8" />
									</div>
								</div>
								<div class="pnApps">
									<template v-for="app in start.pnApps">
										<div v-if="app.empty" class="pnApp pnEmpty"></div>
										<div
											v-else
											class="pnApp"
											:value="app.action != null"
											:data-action="app.action"
											:data-payload="app.payload || 'full'"
										>
											<icon
												class="pnIcon"
												:src="app.icon"
												width="24"
												:payload="app.payload || 'full'"
											/>
											<div class="appName">{{ app.name }}</div>
										</div>
									</template>
								</div>
							</div>
							<div class="recApps">
								<div class="stAcbar">
									<div class="gpname">推荐</div>
									<div class="gpbtn none">
										<div>更多</div>
										<icon fafa="chevron-right" width="8" />
									</div>
								</div>
								<div class="reApps">
									<template v-for="app in start.rcApps.slice(0, 6)">
										<div class="rnApp" v-if="app.name">
											<icon class="pnIcon" :src="app.icon" width="22" />
											<div class="acInfo">
												<div class="appName">{{ app.name }}</div>
												<div class="timeUsed">{{ app.lastUsed }}</div>
											</div>
										</div>
									</template>
								</div>
							</div>
						</div>
					</div>
					<div class="allCont" :data-allapps="start.showAll">
						<div class="appCont">
							<div class="stAcbar">
								<div class="gpname">所有应用</div>
								<div class="gpbtn prtclk" data-action="STARTALL">
									<icon class="chevLeft" fafa="chevron-left" width="8" />
									<div>返回</div>
								</div>
							</div>
							<div class="allApps" :data-alpha="start.alpha">
								<template v-for="(ldx, index) in start.contApps">
									<template v-if="ldx.length !== 0">
										<div
											class="allApp prtclk"
											data-action="STARTALPHA"
											:id="`char${index == 0 ? '#' : fromCharCode(index)}`"
										>
											<div class="ltName">{{ index == 0 ? '#' : fromCharCode(index) }}</div>
										</div>
									</template>
									<div
										v-for="app in ldx"
										class="allApp prtclk"
										:data-action="app.action"
										:data-payload="app.payload || 'full'"
									>
										<icon class="pnIcon" :src="app.icon" width="20" />
										<div class="appName">{{ app.name }}</div>
									</div>
								</template>
							</div>
							<div class="alphaBox" :data-alpha="start.alpha">
								<div class="alphaCont">
									<div class="dullApp allApp">
										<div class="ltName">&</div>
									</div>
									<div
										v-for="(ldx, index) in start.contApps"
										:class="ldx.length == 0 ? 'dullApp allApp' : 'allApp prtclk'"
										data-action="STARTALPHA"
										:data-payload="index === 0 ? '#' : fromCharCode(index)"
									>
										<div class="ltName">{{ index === 0 ? '#' : fromCharCode(index) }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="menuBar">
						<div class="profile handcr">
							<icon
								src="blueProf"
								ui
								rounded
								width="26"
								click="EXTERNAL"
								payload="https://blueedge.me"
							/>
							<div class="usName">Blue Edge</div>
						</div>
						<div class="powerCtrl">
							<icon src="power" ui width="14" invert />
						</div>
					</div>
				</div>
				<div v-else className="searchMenu">
					<div className="searchBar">
						<icon src="search" ui width="16" />
						<input type="text" :defaultValue="query" placeholder="请输入 ..." />
					</div>
					<div className="flex py-4 px-1 text-xs">
						<div className="opts w-1/2 text-gray-700 flex justify-between">
							<div :value="atab == 'All'">All</div>
							<div :value="atab == 'Apps'">Apps</div>
							<div :value="atab == 'Documents'">Documents</div>
							<div :value="atab == 'Web'">Web</div>
							<div :value="atab == 'More'">More</div>
						</div>
					</div>
					<div className="shResult w-full flex justify-between">
						<div className="leftSide flex-col px-1" :data-width="query.length != 0">
							<div className="text-xss font-semibold mb-4">
								{{ query.length ? 'Best match' : 'Top apps' }}
							</div>
							<div className="textResult h-16" v-if="query.length">
								<div className="smatch flex my-2 bg-gray-100 p-3 rounded">
									<icon :src="match.icon" width="24" />
									<div className="matchInfo flex-col px-2">
										<div className="font-semibold text-xs">{{ match.name }}</div>
										<div className="text-xss">App</div>
									</div>
								</div>
								<div
									className="smatch flex my-2 bg-gray-100 p-3 rounded handcr prtclk"
									data-action="EDGELINK"
									:data-payload="query"
								>
									<icon src="search" ui width="20" />
									<div className="matchInfo flex-col px-2">
										<div className="font-semibold text-xs">Search online</div>
										<div className="text-xss">Web</div>
									</div>
								</div>
							</div>
							<div className="topApps flex w-full justify-between" v-else>
								<div
									className="topApp pt-4 py-2 bg-gray-100 ltShad"
									v-for="app in start.rcApps.slice(2, 7)"
								>
									<icon
										:click="app.action"
										:payload="app.payload || 'full'"
										:src="app.icon"
										width="24"
									/>
									<div className="text-xs mt-2">{{ app.name }}</div>
								</div>
							</div>
							<div className="text-xss font-semibold mt-8">Quick Searches</div>
							<div className="quickSearches pl-4 mt-2">
								<div
									v-for="srch in start.qksrch"
									className="qksrch flex align-center py-3 handcr prtclk"
									data-action="EDGELINK"
									:data-payload="srch[2]"
								>
									<icon :fafa="srch[0]" :reg="srch[1]" />
									<div className="ml-4 text-xs">{{ srch[2] }}</div>
								</div>
							</div>
						</div>
						<div className="w-2/3 rightSide rounded" v-if="query.length">
							<icon className="mt-6" :src="match.icon" width="64" />
							<div>{{ match.name }}</div>
							<div className="text-xss mt-2">App</div>
							<div className="hline mt-8"></div>
							<div
								className="openlink w-4/5 flex prtclk handcr pt-3"
								:data-action="match.action"
								:data-payload="match.payload ? match.payload : 'full'"
							>
								<icon src="link" ui width="16" />
								<div className="text-xss ml-3">Open</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>
<script lang="ts">
	import { defineComponent, computed, ref, watchEffect } from 'vue';
	import { useStore, mapGetters } from 'vuex';
	import general from '../general/index';
	const { icon } = general;
	export default defineComponent({
		setup() {
			const {
				getters: { tasks, start },
			}: any = useStore();
			const query = ref('');
			const match: any = ref('');
			const atab = ref('All');
			const tabSw = (e: any) => {
				atab.value = e.target.innerText.trim();
			};
			watchEffect(() => {
				if (query.value.length) {
					for (var i = 0; i < start.allApps.length; i++) {
						if (start.allApps[i].name.toLowerCase().includes(query.value.toLowerCase())) {
							match.value = start.allApps[i];
							break;
						}
					}
				}
			});
			const fromCharCode = (index: any) => String.fromCharCode(index + 64);
			return {
				align: computed(() => tasks.align),
				query,
				match,
				atab,
				tabSw,
				fromCharCode,
			};
		},
		methods: {},
		computed: {
			...mapGetters(['start']),
		},
		components: {
			icon,
		},
	});
</script>
<style lang="scss" scoped>
	.startMenu {
		--roundRad: 6px;
		position: absolute;
		bottom: 10px;
		width: 520px;
		left: 0;
		// left: calc(50% - 260px);
		// height: 200px;
		&[data-align='center'] {
			margin-left: auto;
			margin-right: auto;
			right: 0;
			text-align: center;
		}

		&[data-align='left'] {
			left: 8px;
		}

		background: rgba(255, 255, 255, 0.88);
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(20px);
		border-radius: var(--roundRad);
		overflow: hidden;
		transition: all ease-in-out 200ms;
		z-index: 9999;

		&[data-hide='true'] {
			bottom: -300px;
			opacity: 0;
			pointer-events: none;
		}
	}
	.menuBox {
		transition: ease-in-out 200ms;
	}

	.allCont,
	.stmenu {
		position: relative;
		width: 520px;
		height: 480px;

		&[data-allapps='false'] {
			transition: ease-in-out 200ms;
		}

		&[data-allapps='true'] {
			margin-left: -520px;
			transition: ease-in-out 200ms;
		}
	}
	.allCont {
		top: 0;
		position: absolute;
		left: 100%;
		overflow: hidden;
	}

	.menuBar {
		max-width: 100%;
		height: 54px;
		padding: 0 48px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background: rgba(175, 175, 175, 0.1);
	}

	.profile {
		height: 100%;
		display: flex;
		align-items: center;

		.usName {
			margin-left: 12px;
			font-size: 0.7em;
			font-weight: 400;
			color: #111;
		}
	}

	.menuUp {
		padding: 36px 48px;
		// background: rgba(255, 255, 255, 0.84);
	}

	.stAcbar {
		display: flex;
		justify-content: space-between;

		.gpname {
			font-weight: 600;
			font-size: 0.74em;
			color: #111;
		}

		.gpbtn {
			background: rgba(255, 255, 255, 0.9);
			padding: 0 8px 2px;
			font-size: 0.64em;
			font-weight: 400;
			display: flex;
			align-items: center;
			border-radius: 3px;
			box-shadow: 1px 1px 2px rgba(34, 34, 34, 0.25);
			cursor: pointer;

			svg {
				margin-left: 4px;
				padding-top: 2px;
				color: #414141;
			}

			.chevLeft svg {
				margin-left: 0;
				margin-right: 4px;
			}
		}
	}

	.pnApps {
		min-height: 150px;
		padding: 20px 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: space-between;
		justify-content: space-between;

		.pnApp {
			width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 10px 0;
			position: relative;

			&[value='true'] .pnIcon::before {
				content: '';
				position: absolute;
				top: -2px;
				right: -2px;
				width: 3px;
				height: 3px;
				border: solid 1px #88b7ee;
				border-radius: 6px;
				background: #1372e3;
			}

			.pnIcon::after {
				content: '';
				position: absolute;
				width: 0;
				height: 0;
				top: -12px;
				padding: 0 42px 60px;
				background: rgba(255, 255, 255, 0);
				z-index: -1;
				transition: all ease-in-out 100ms;
				border-radius: 4px;
			}

			.appName {
				width: 24px;
				display: flex;
				color: #2f2f2f;
				margin-top: 4px;
				font-weight: 500;
				font-size: 0.64em;
				text-align: center;
				white-space: nowrap;
				justify-content: center;
				cursor: default;
			}

			&:nth-child(6n + 1) {
				width: 10%;
				align-items: flex-start;
			}

			&:nth-child(6n) {
				width: 10%;
				align-items: flex-end;
			}
		}

		.pnApp:hover .pnIcon::after {
			background: rgba(255, 255, 255, 0.5);
		}
	}

	.pnEmpty {
		pointer-events: none;
	}

	.recApps {
		margin-top: 12px;
	}

	.reApps {
		width: 100%;
		height: 150px;
		padding: 10px 0;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 240px 184px;
		grid-template-rows: repeat(3, minmax(0, 1fr));

		.rnApp {
			display: flex;
			align-items: center;

			.acInfo {
				width: 100px;
				text-align: left;
				margin: 0 12px;

				.appName {
					color: #2f2f2f;
					font-size: 0.7em;
					font-weight: 700;
				}

				.timeUsed {
					color: #535353;
					font-size: 0.6em;
					font-weight: 500;
				}
			}
		}
	}

	.appCont {
		position: relative;
		padding: 36px 4px 36px 36px;

		.stAcbar {
			padding-left: 12px;
			padding-right: 44px;
		}
	}

	.allApps {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		height: 400px;
		overflow-x: visible;
		overflow-y: scroll;
		transition: all ease-in-out 200ms;
		transform-origin: center;

		&[data-alpha='true'] {
			transform: scale(0);
			opacity: 0;
			pointer-events: none;
		}

		&::-webkit-scrollbar {
			display: none;
			width: 1.6px;
			background-color: transparent;
		}

		&:hover::-webkit-scrollbar {
			display: block;
		}

		&::-webkit-scrollbar-thumb {
			width: 1.6px;
			border-radius: 10px;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.allApp {
			position: relative;
			display: flex;
			align-items: center;
			padding: 8px 0 8px 12px;
			z-index: 1;
			cursor: pointer;

			&:hover::after {
				content: '';
				position: absolute;
				width: 94%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: -1;
				border-radius: 4px;
				background: rgba(255, 255, 255, 0.4);
			}

			.ltName {
				width: 18px;
				text-align: center;
				font-size: 0.76em;
				font-weight: 400;
			}

			.appName {
				width: 20%;
				padding-left: 4px;
				color: #2f2f2f;
				font-weight: 500;
				font-size: 0.6em;
				margin: 0 12px;
			}
		}
	}

	.alphaBox {
		position: absolute;
		top: 14%;
		width: 94%;
		height: 80%;
		z-index: 2;
		display: grid;
		place-items: center;
		transform-origin: center;
		transition: all ease-in-out 200ms;

		&[data-alpha='false'] {
			opacity: 0;
			transform: scale(2);
			pointer-events: none;
		}
	}

	.alphaCont {
		margin-left: -48px;
		width: 160px;
		height: 280px;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-template-rows: repeat(7, minmax(0, 1fr));
		color: #010101;
		cursor: pointer;

		.allApp {
			display: grid;
			place-items: center;
		}

		.dullApp {
			cursor: default;
			color: rgba(0, 0, 0, 0.36);
		}
	}
	.mask-leave-active {
		transition: all 1s;
		transition-delay: 1s;
	}
	.searchMenu {
		min-height: 500px;
		padding: 12px;
		text-align: left;
	}

	.searchBar {
		height: 30px;
		border: solid 2px #0e60e4;
		border-radius: 6px;
		background: #fefefe;
		display: flex;
		padding: 0 10px;

		.uicon {
			filter: brightness(0.6);
			margin-right: 12px;
		}

		input {
			width: 400px;
			color: #222;
		}
	}

	.opts div {
		border: solid 0 #1f4aff;
		cursor: pointer;

		&[value='true'] {
			border-bottom-width: 2px;
		}
	}

	.leftSide {
		width: 100%;
	}

	.leftSide[data-width='true'] {
		width: 32%;
	}

	.rightSide {
		margin: 8px;
		height: 400px;
		background: #fafafa;
		display: flex;
		flex-direction: column;
		align-items: center;

		.hline {
			width: 90%;
			height: 1px;
			border-radius: 10px;
			background: #dfdfdf;
		}
	}

	.topApp {
		width: 19%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 4px;
	}

	.qksrch {
		color: #111;
	}

	.qksrch svg {
		color: #333;
	}

	.calnpane {
		position: absolute;
		bottom: 12px;
		right: 12px;
		// width: 280px;
		min-height: 300px;
		background: rgba(255, 255, 255, 0.88);
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
		overflow: hidden;
		transition: all ease-in-out 200ms;
		z-index: 9999;
		border-radius: 6px;

		&[data-hide='true'] {
			bottom: 10px;
			transform: translateY(120%);
		}
	}
</style>
