<template>
	<div
		:class="`uicon ${prtclk}`"
		:data-open="open != null"
		:data-action="click"
		:data-active="active"
		:data-payload="payload"
		v-if="!fafa"
		@click="click != null ? clickDispatch(click) : null"
	>
		<img
			v-if="src"
			:width="width"
			:data-action="click"
			:data-payload="payload"
			:data-click="click != null"
			:data-flip="flip != null"
			:height="height"
			:data-invert="invert != null ? 'true' : 'false'"
			:data-rounded="rounded != null ? 'true' : 'false'"
			:src="srcUrl"
			alt=""
		/>
	</div>
	<div v-else class="uicon prtclk" :data-action="click" :data-payload="payload">
		<font-awesome-icon
			:data-flip="flip != null"
			:data-invert="invert != null ? 'true' : 'false'"
			:data-rounded="rounded != null ? 'true' : 'false'"
			:style="{ width, height: height || width, color: color || null, margin: margin || null }"
			:icon="[reg == null ? 'fas' : 'fas', fafa]"
		/>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed } from 'vue';
	import { useStore } from 'vuex';
	export default defineComponent({
		props: [
			'fafa',
			'width',
			'height',
			'src',
			'pr',
			'ext',
			'ui',
			'open',
			'active',
			'payload',
			'flip',
			'invert',
			'rounded',
			'margin',
			'color',
			'click',
			'reg',
		],
		setup(props) {
			const { commit }: any = useStore();
			const srcUrl = computed(() => {
				if (props.ext != null) {
					return props.src;
				} else {
					return `/img/icon/${props.ui != null ? 'ui/' : ''}${props.src}.png`;
				}
			});
			const prtclk = computed(() => {
				if (props.src) {
					if (props.pr != null) {
						return 'prtclk';
					} else {
						return '';
					}
				}
			});

			return { prtclk, srcUrl, clickDispatch: (action: any) => commit(action) };
		},
	});
</script>
<style lang="scss" scoped>
	.uicon {
		position: relative;
		display: grid;
		place-items: center;
	}
</style>