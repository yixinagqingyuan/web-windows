<template>
	<div class="sidePane dpShad" :data-hide="paneApps.hide">
		<div class="notifArea">
			<div class="managentf btnText">Manage notifications</div>
			<div class="nonewnotif">No new notifications</div>
		</div>
		<div class="quickSettings">
			<div class="btnText">Collapse</div>
			<div class="quickCont">
				<div
					v-for="(qk, idx) in paneApps.quicks"
					class="qkbtn handcr prtclk"
					data-action="PANEQBTN"
					:data-payload="idx"
					data-state="{qk.state}"
				>
					<Icon
						class="quickIcon"
						:ui="qk.ui"
						:src="qk.src"
						width="14"
						:invert="qk.state ? true : null"
					/>
					<div class="qktext">{{ qk.name }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { defineComponent, watchEffect } from 'vue';
	import { Icon } from '../general/index';
	import { useStore } from 'vuex';
	export default defineComponent({
		components: {
			Icon,
		},
		setup() {
			const {
				getters: { paneApps },
			}: any = useStore();
			watchEffect(() => {
				if (paneApps.quicks[2].state) {
					(document.body.dataset as any).sepia = true;
				} else {
					(document.body.dataset as any).sepia = false;
				}
			});
			return {
				paneApps,
			};
		},
	});
</script>
<style lang="scss" scoped>
	.sidePane {
		--nfheight: 200px;
		position: absolute;
		top: 0;
		right: 0;
		width: 320px;
		height: 100%;
		background: rgba(255, 255, 255, 0.88);
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(20px);
		overflow: hidden;
		transition: all ease-in-out 200ms;
		z-index: 9999;

		&[data-hide='true'] {
			right: -330px;
		}
	}

	.notifArea {
		position: relative;
		width: 100%;
		height: calc(100% - var(--nfheight));
	}

	.quickSettings {
		height: var(--nfheight);
		padding: 0 16px;
	}

	.btnText {
		font-size: 0.62em;
		color: #040041;
	}

	.quickCont {
		width: 100%;
		padding: 14px 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.qkbtn {
		width: 60px;
		height: 36px;
		display: flex;
		margin-bottom: 4px;
		border-radius: 4px;
		flex-direction: column;
		align-items: flex-start;
		padding: 8px 4px 4px;
		justify-content: space-between;
		border-bottom-color: rgba(0, 0, 0, 0.2);
		background: rgba(255, 255, 255, 0.9);
		border: solid 0.1px rgba(17, 17, 17, 0.1);
		transition: all 0.1s ease;
		&[data-state='true'] {
			background: rgb(0, 90, 255);

			.qktext {
				color: #ececec;
			}
		}
	}

	.qktext {
		width: max-content;
		font-size: 0.6em;
	}

	.managentf {
		text-align: right;
		padding: 13px 14px;
	}

	.nonewnotif {
		position: absolute;
		top: 48%;
		left: 32%;
		font-size: 0.72em;
		font-weight: 500;
		color: #464646;
	}
</style>
