<template>
	<div className="widPaneCont" :data-hide="widget.hide">
		<div className="WidPane" loading="lazy">
			<div className="widtop">
				<Icon fafa="ellipsis-h" width="12" />
			</div>
			<div className="widTime">
				{{ new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) }}
			</div>
			<div className="widgetCont">
				<div className="topWidgets">
					<div className="weatherCont ltShad">
						<div className="wthtop">WEATHER</div>
						<div className="wthcity">
							<Icon fafa="map-marker" width="8" />
							{{ widget.data.weather.city }}, {{ widget.data.weather.country }}
						</div>
						<div className="wthInfo">
							<div className="wthTemp">
								<Icon
									:src="`https://www.metaweather.com/static/img/weather/png/64/${widget.data.weather.icon}.png`"
									ext
									width="32"
								/>
								<div className="wthdeg">{{ widget.data.weather.temp }}</div>
								<div className="wthunit">ºC</div>
							</div>
							<div className="moreWinfo">
								<div className="wcontext">
									{{ widget.data.weather.wstate }}
								</div>
								<div className="rainProb">
									<div className="chanceOfRain">
										<Icon fafa="tint" width="10" />
										{{ widget.data.weather.rain }}%
									</div>
									<div className="chanceOfRain">
										<Icon fafa="wind" width="10" />
										{{ widget.data.weather.wind }}
									</div>
								</div>
							</div>
						</div>
						<div className="weekWthCont">
							<div className="weekDay" v-for="(item, i) in widget.data.weather.days">
								<div>{{ i == 0 ? 'Today' : item.day }}</div>
								<Icon
									:src="`https://www.metaweather.com/static/img/weather/png/64/${item.icon}.png`"
									ext
									width="24"
								/>
								<div className="tempCont">{{ item.min }}º</div>
								<div className="tempCont">{{ item.max }}º</div>
							</div>
						</div>
					</div>
					<div className="shortCont">
						<div className="short0 ltShad">
							<div className="shName">MONEY | MARKET</div>
							<div className="shEntry">
								<div className="stockName">
									<Icon src="google" ui width="12" />
									<div className="stName">GOOGL</div>
								</div>
								<div className="stockValue">
									<div>{{ widget.data.stock[0][0] }}</div>
									<div className="stRes" :data-pos="widget.data.stock[0][2] == 1">
										{{ widget.data.stock[0][2] ? '+' : '-' }}
										{{ widget.data.stock[0][1] }}%
									</div>
								</div>
							</div>
							<div className="shEntry">
								<div className="stockName">
									<Icon src="tesla" ui width="12" />
									<div className="stName">TSLA</div>
								</div>
								<div className="stockValue">
									<div>{{ widget.data.stock[1][0] }}</div>
									<div className="stRes" :data-pos="widget.data.stock[1][2] == 1">
										{{ widget.data.stock[1][2] ? '+' : '-' }}
										{{ widget.data.stock[1][1] }}%
									</div>
								</div>
							</div>
						</div>
						<div
							className="short1 ltShad"
							:style="{
								backgroundImage: `url(${
									widget.data.event.pages[0].thumbnail &&
									widget.data.event.pages[0].thumbnail.source
								})`,
							}"
						>
							<div className="shName">
								<div className="flex">
									<Icon fafa="landmark" width="8" />
									&nbsp;ON THIS DAY
								</div>
								<div>{{ widget.data.date }}</div>
							</div>
							<div className="infotextCont">
								<div className="dayInfo">
									{{ widget.data.event.text }}
								</div>
								<a
									:href="widget.data.event.pages[0].content_urls.desktop.page"
									target="_blank"
									className="wikiref"
									>more on wiki</a
								>
							</div>
						</div>
					</div>
				</div>
				<div className="newsCont">
					<div className="topStories ltShad">
						<div className="topNewsText">TOP STORIES</div>
						<div className="topNewsCont">
							<div
								className="tpNews"
								key="{i}"
								v-for="article in [...widget.data.news].splice(0, 4)"
							>
								<div className="tpSource">{{ article.source.name }}</div>
								<div className="tpArticle">{{ article.title }}</div>
							</div>
						</div>
					</div>
					<div className="allNewsCont">
						<div
							v-for="(article, i) in [...widget.data.news].splice(4, widget.data.news.length)"
							className="articleCont ltShad"
							:style="{
								backgroundImage: `url(${article.urlToImage})`,
							}"
						>
							<div className="tpNews">
								<div className="tpSource">{{ article.source.name }}</div>
								<div className="tpArticle">{{ article.title }}</div>
								<div v-if="i % 5 === 4" className="tpdesc">{{ article.content }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { defineComponent, watchEffect } from 'vue';
	import { useStore } from 'vuex';
	import { Icon } from '../general/index';
	export default defineComponent({
		setup() {
			const {
				getters: { widget },
			}: any = useStore();
			const getRandom = (x = 0) => {
				return `hsl(${Math.floor(Math.random() * 360)}deg 36% 84%)`;
			};
			return {
				widget,
				getRandom,
			};
		},
		components: {
			Icon,
		},
	});
</script>
<style lang="scss" scoped>
	.widPaneCont {
		position: absolute;
		top: 0;
		left: 0;
		width: 610px;
		height: 100%;
		padding: 5px;
		overflow: hidden;
		transition: all ease-in-out 200ms;
		z-index: 9999;

		&[data-hide='true'] {
			left: -620px;
		}
	}

	.WidPane {
		width: 100%;
		border-radius: 8px;
		height: calc(100% - 12px);
		backdrop-filter: blur(40px);
		-webkit-backdrop-filter: blur(40px);
		background: rgba(255, 255, 255, 0.25);
		display: flex;
		flex-direction: column;
		align-items: center;

		overflow-x: hidden;
		overflow-y: scroll;

		&::-webkit-scrollbar {
			width: 1.6px;
			background-color: transparent;
		}

		&:hover::-webkit-scrollbar-thumb {
			background: rgba(0, 0, 0, 0.4);
		}

		&::-webkit-scrollbar-thumb {
			width: 1.6px;
			box-sizing: border-box;
			border-radius: 10px;
			background-color: transparent;
		}

		.widtop {
			width: 96%;
			display: flex;
			padding: 18px 28px 0 0;
			justify-content: flex-end;
			color: #222;
		}

		.widTime {
			display: flex;
			justify-content: center;
			font-size: 1.5em;
			color: #222;
		}

		.widgetCont {
			width: 80%;
		}

		.topWidgets {
			margin-top: 24px;
			display: flex;
			justify-content: space-between;

			.weatherCont {
				width: 50%;
				margin: 4px;
				height: 240px;
				padding: 12px 14px;
				border-radius: 6px;
				box-sizing: border-box;
				background: rgb(255, 255, 255);
				background: -webkit-linear-gradient(
					top left,
					rgba(255, 255, 255, 0.9951330874146533) 0%,
					rgba(255, 243, 190, 1) 80%
				);
				background: -o-linear-gradient(
					top left,
					rgba(255, 255, 255, 0.9951330874146533) 0%,
					rgba(255, 243, 190, 1) 80%
				);
				background: linear-gradient(
					to bottom right,
					rgba(255, 255, 255, 0.9951330874146533) 0%,
					rgba(255, 243, 190, 1) 80%
				);
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.wthtop {
				width: 100%;
				font-size: 0.6em;
				font-weight: 400;
			}

			.wthcity {
				width: 50%;
				display: flex;
				font-size: 0.64em;
				margin-top: 8px;

				* {
					margin: 0 2px;
				}
			}

			.wthInfo {
				width: 100%;
				display: flex;
				justify-content: space-between;
			}

			.wthTemp {
				display: flex;
				align-items: flex-end;

				.uicon {
					padding-bottom: 4px;
				}

				* {
					margin: 0 3px;
				}

				.wthdeg {
					font-size: 2em;
				}

				.wthunit {
					margin: 0 2px;
					font-size: 0.72em;
					color: rgba(5, 5, 5, 0.4);
					padding-bottom: 6px;
				}
			}

			.moreWinfo {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				padding-top: 2px;
			}

			.wcontext {
				font-size: 0.68em;
				margin-bottom: 4px;
			}

			.rainProb {
				display: flex;

				.chanceOfRain {
					display: flex;
					font-size: 0.68em;
					margin-left: 12px;

					.uicon {
						margin-right: 2px;
						color: rgba(0, 0, 0, 0.8);
					}
				}
			}

			.weekWthCont {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 12px;

				.weekDay {
					width: 23%;
					border-radius: 4px;
					padding: 4px 0;
					background: rgba(255, 255, 255, 0.4);
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					font-size: 0.6em;
					padding-bottom: 12px;

					.uicon {
						margin: 8px 0;
					}

					.tempCont {
						font-size: 1.36em;
						color: #3b3b3b;
					}
				}
			}

			.shortCont {
				width: 50%;
				height: 250px;
				display: flex;
				flex-direction: column;

				.short0,
				.short1 {
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					margin: 4px 4px 6px;
					background: #fefefe;
					border-radius: 6px;
					padding: 8px 12px 0;
					overflow: hidden;

					.shName {
						width: 100%;
						font-size: 0.6em;
						letter-spacing: 1px;
						color: #666;
						margin-bottom: 16px;
						display: flex;
						justify-content: space-between;
					}

					.shEntry {
						display: flex;
						justify-content: space-between;
						margin-bottom: 18px;

						.stockName {
							display: flex;
							font-size: 0.8em;
							font-weight: 500;

							.uicon {
								margin-right: 6px;
							}

							.stName {
								color: #4a4a4a;
								padding-top: 1px;
							}
						}

						.stockValue {
							font-size: 0.8em;
							font-weight: 600;
							display: flex;
						}

						.stRes {
							width: 52px;
							text-align: center;
							padding: 1px 0;
							border-radius: 2px;
							margin-left: 8px;
							font-size: 0.8em;
							background: #eb3535;
							color: #fefefe;

							&[data-pos='true'] {
								background: #09d031;
							}
						}
					}
				}

				.short1 {
					position: relative;
					background-color: #fefefe00;
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
					z-index: 1;

					&::after {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: var(--afterBack);
						background-repeat: no-repeat;
						background-size: contain;
						background-position: center;
						filter: brightness(0.72);
						z-index: -1;
					}

					&::before {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;

						backdrop-filter: brightness(0.8);
						-webkit-backdrop-filter: brightness(0.8);
						filter: blur(10px);
						z-index: -2;
					}

					.shName {
						margin-bottom: 4px;
						color: #fefefe;

						div:nth-child(2) {
							font-weight: 600;
							color: #fefefe;
						}
					}

					.infotextCont {
						position: absolute;
						bottom: 6px;
						padding-right: 10px;
						display: flex;
						flex-direction: column;
					}

					.dayInfo {
						max-height: 64px;
						font-size: 0.72em;
						color: #fefefe;
						margin-top: auto;
						line-height: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 4;
						-webkit-box-orient: vertical;
						text-align: justify;
					}

					a {
						text-decoration: none;
						font-size: 0.64em;
						color: #c1e2ff;
						text-align: right;
					}
				}
			}
		}
	}

	.newsCont {
		width: 100%;
		margin-top: 18px;
		padding: 6px;

		* {
			cursor: default;
		}
	}

	.topStories {
		position: relative;
		border-radius: 4px;
		padding: 12px;
		background: rgb(209, 209, 209);
		background: -webkit-linear-gradient(
			top left,
			rgba(230, 230, 230, 1) 0%,
			rgba(255, 255, 255, 1) 100%
		);
		background: -o-linear-gradient(top left, rgba(230, 230, 230, 1) 0%, rgba(255, 255, 255, 1) 100%);
		background: linear-gradient(
			to bottom right,
			rgba(230, 230, 230, 1) 0%,
			rgba(255, 255, 255, 1) 100%
		);

		&::after {
			content: 'source: saurav.tech/NewsAPI';
			position: absolute;
			bottom: 0;
			right: 0;
			font-size: 0.64em;
			padding: 6px;
			color: #0e2d67;
		}

		.topNewsText {
			color: #1f202e;
			font-size: 0.72em;
			font-weight: 600;
		}

		.topNewsCont {
			width: 100%;
			display: grid;
			padding-bottom: 12px;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-rows: repeat(2, minmax(0, 1fr));

			.tpNews {
				padding: 16px 12px 0 0;

				.tpSource {
					color: #666;
					font-size: 0.6em;
				}

				.tpArticle {
					margin: 4px 0;
					font-size: 0.76em;
					font-weight: 600;
					color: #1d1d25;
					height: 48px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					text-align: justify;
				}
			}
		}
	}

	.allNewsCont {
		margin-top: 12px;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-column-gap: 10px;
		grid-row-gap: 10px;
	}

	.articleCont {
		position: relative;
		height: 220px;
		padding: 0 12px;
		border-radius: 6px;
		overflow: hidden;
		background-color: #e6e6e6;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;

		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgb(255, 255, 255);
			background: -webkit-linear-gradient(hsl(0deg 12% 90% / 0%) 50%, var(--backgrad) 90%);
			background: -o-linear-gradient(hsl(0deg 12% 90% / 0%) 50%, var(--backgrad) 90%);
			background: linear-gradient(hsl(0deg 12% 90% / 0%) 50%, var(--backgrad) 90%);
			z-index: 0;
		}

		.tpNews {
			position: absolute;
			bottom: 0;
			padding: 0 12px 12px 0;

			.tpSource {
				color: #222;
				font-size: 0.6em;
				font-weight: 500;
				text-shadow: 0 0 4px white;
			}

			.tpArticle {
				margin-top: 4px;
				font-size: 0.8em;
				font-weight: 600;
				color: #111;
				max-height: 56px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				text-align: justify;
			}
		}

		&:nth-child(5n) {
			grid-column-start: 1;
			grid-column-end: 3;
			background-size: contain;
			background-position-x: 160px;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgb(255, 255, 255);
				background: -webkit-linear-gradient(right, hsl(0deg 12% 90% / 0%) 0%, var(--backgrad) 60%);
				background: -o-linear-gradient(right, hsl(0deg 12% 90% / 0%) 0%, var(--backgrad) 60%);
				background: linear-gradient(to left, hsl(0deg 12% 90% / 0%) 0%, var(--backgrad) 60%);
				z-index: 0;
			}

			.tpNews {
				width: 45%;
				position: relative;
				padding: 16px 0;

				.tpSource {
					margin-bottom: 24px;
				}

				.tpArticle {
					margin-bottom: 8px;
				}

				.tpdesc {
					font-size: 0.72em;
					font-weight: 400;
					color: #4d4d4d;
					max-height: 90px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 5;
					-webkit-box-orient: vertical;
					text-align: justify;
				}
			}
		}
	}
</style>
