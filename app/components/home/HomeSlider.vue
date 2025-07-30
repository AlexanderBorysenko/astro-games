<template>
	<div class="home-slider">
		<Swiper
			:modules="modules"
			:slides-per-view="1"
			:space-between="0"
			:pagination="{ clickable: true }"
			:loop="true"
			:autoplay="{
				delay: 6000,
				disableOnInteraction: true,
				stopOnLastSlide: false,
				pauseOnMouseEnter: true
			}"
			:effect="'fade'"
			:fade-effect="{ crossFade: true }"
			class="home-slider__swiper"
		>
			<SwiperSlide class="home-slider__slide">
				<div class="home-slider__content">
					<h2 class="home-slider__title">Early Game</h2>
					<p class="home-slider__description _larger">
						OG Game for early birds start playing now and earn
						points for $AST
					</p>
					<NuxtLink href="/planes" class="home-slider__button">
						<span class="home-slider__button-inner">
							Play now
						</span>
						<img
							ref="buttonImageRef"
							src="~/assets/images/play-button-decoration.svg"
							class="home-slider__button-image"
							alt=""
						/>
					</NuxtLink>
				</div>
				<div class="home-slider__image">
					<img src="~/assets/images/slide-1-image.png" alt="" />
				</div>
				<div class="plane-game-plane _1">
					<img src="~/assets/images/plane.png" class="" alt="" />
				</div>
				<div class="plane-game-plane _2">
					<img src="~/assets/images/plane.png" class="" alt="" />
				</div>
			</SwiperSlide>
			<SwiperSlide class="home-slider__slide">
				<div class="home-slider__content">
					<h2 class="home-slider__title">Discover the future</h2>
					<p class="home-slider__description">
						Unveil the next era of gaming with AstroGame, where
						innovation meets rewards.
					</p>
					<p class="home-slider__description">
						Explore cutting-edge P2E experiences and secure your
						place in a thriving $AST ecosystem.
					</p>
				</div>
				<div class="home-slider__image">
					<img src="~/assets/images/slide-2-image.png" alt="" />
				</div>
			</SwiperSlide>
			<SwiperSlide class="home-slider__slide">
				<div class="home-slider__content">
					<h2 class="home-slider__title">Soon! Convert to $AST</h2>
					<p class="home-slider__description">
						Looking ahead with Astro, soon you’ll be able to convert
						your Astro Points to the $AST.
					</p>
				</div>
				<div
					class="home-slider__image"
					style="border: 0.1875rem solid #302d2e"
				>
					<img src="~/assets/images/slide-3-image.png" alt="" />
				</div>
			</SwiperSlide>
		</Swiper>
		<img
			ref="fireDecorationRef"
			class="home-slider__fire-decoration"
			src="~/assets/images/home-slider-fire-decoration.svg"
			alt=""
		/>
	</div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const modules = [Pagination, Autoplay, EffectFade];

// Use the reusable animation composable for both elements
const buttonAnimation = useElementAnimation({
	interval: 400,
	rotation: { min: 12.13, max: 36.13 },
	scale: { min: 0.8, max: 1.1 }
});

const fireAnimation = useElementAnimation({
	interval: 400,
	rotation: { min: -10, max: 10 },
	scale: { min: 0.8, max: 1.1 }
});

// Extract refs for easier template usage
const { elementRef: buttonImageRef } = buttonAnimation;
const { elementRef: fireDecorationRef } = fireAnimation;
</script>

<style lang="scss" scoped>
.home-slider {
	--border-radius: 3.125rem;
	width: 100%;
	height: 20.75rem;
	background: #302d2e;
	border-radius: var(--border-radius);
	position: relative;

	@media (max-width: 1024px) {
		height: 18.75rem;
		background: none;
	}
	&::before {
		content: '';
		position: absolute;
		top: -0.75rem;
		bottom: -1.75rem;
		left: -2.25rem;
		right: -2rem;
		background-image: url('/images/slider-content-decoration.svg');
		background-size: contain;
		background-repeat: no-repeat;
		z-index: -1;
		@media (max-width: 1024px) {
			left: -0.625rem;
			bottom: -0.375rem;
			right: -0.9375rem;
			top: 9.5rem;
			background-image: url('/images/slider-content-decoration-mobile.svg');
		}
	}
	&__swiper {
		width: 100%;
		height: 100%;
		overflow: visible !important; // Ensure the swiper is visible
	}

	&__slide {
		background: linear-gradient(135deg, #302d2e 0%, #1a1718 100%);
		border-radius: var(--border-radius);
		position: relative;
		@media (max-width: 1024px) {
			display: flex;
			flex-direction: column;
			background: none;
		}
	}

	&__content {
		position: relative;
		width: 50%;
		height: 100%;
		z-index: 2;
		padding: 3.125rem 1rem 3.125rem 3.125rem;
		display: flex;
		flex-direction: column;
		gap: 0.9375rem;
		color: #fff;
		@media (max-width: 1024px) {
			width: 100%;
			height: 8rem;
			padding: 0 1.25rem 0.8125rem 1.875rem;
			gap: 0.5rem;
			margin-top: auto;
		}
		&::before {
			content: '';
			position: absolute;
			top: -0.75rem;
			bottom: -1.75rem;
			left: -2.25rem;
			right: -2rem;
			background-image: url('/images/slider-content-decoration.svg');
			background-size: contain;
			background-repeat: no-repeat;
			z-index: -1;
			@media (max-width: 1024px) {
				position: absolute;
				width: 19.6956rem;
				height: 9.6606rem;
				left: -0.6331rem;
				top: -1.3125rem;
				background-image: url('/images/slider-content-decoration-mobile.svg');
			}
		}
	}

	&__image {
		position: absolute;
		inset: 0;
		border-radius: var(--border-radius);
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			@media (max-width: 1024px) {
				object-position: right center;
			}
		}

		@media (max-width: 1024px) {
			border-radius: 1.5625rem;
			height: 10.625rem;
		}
	}

	&__fire-decoration {
		position: absolute;
		bottom: -7rem;
		right: -7rem;
		transform-origin: top left;
		transition: none; // Disable transitions for instant changes
	}

	// Custom pagination styles
	:deep(.swiper-pagination) {
		display: flex;
		align-items: center;
		padding: 0.3125rem;
		position: absolute;
		left: unset;
		right: 1.875rem;
		bottom: 1.875rem;
		width: fit-content;

		background: rgba(0, 0, 0, 0.76);
		border-radius: 6.25rem;
		@media (max-width: 1024px) {
			padding: 0.125rem;
			right: 0.9375rem;
			bottom: unset;
			top: 0.9375rem;
		}
	}

	:deep(.swiper-pagination-bullet) {
		width: 1rem;
		height: 1rem;
		background: #888888;
		opacity: 1;
		transition: all 0.3s ease;
		@media (max-width: 1024px) {
			width: 0.5625rem;
			height: 0.5625rem;
		}
	}

	:deep(.swiper-pagination-bullet-active) {
		background: #fff;
	}

	&__title {
		font-family: 'TT Norms Pro Expanded';
		font-style: normal;
		font-weight: 700;
		font-size: 2.5rem;
		line-height: 3.1875rem;
		color: #ffffff;

		@media (max-width: 1024px) {
			font-family: 'TT Norms Pro Expanded';
			font-style: normal;
			font-weight: 700;
			font-size: 1.25rem;
			line-height: 1.625rem;
		}
	}

	&__description {
		max-width: 26.375rem;
		font-weight: 500;

		font-size: 1.25rem;
		line-height: 1.625rem;

		&._larger {
			font-size: 1.5625rem;
			line-height: 2rem;
		}

		@media (max-width: 1024px) {
			max-width: 12.8125rem;
			font-weight: 500;
			font-size: 0.65rem !important;
			line-height: 0.8375rem !important;
		}
	}

	&__button {
		border-radius: 0.9375rem;
		position: relative;
		z-index: 2;
		width: fit-content;
		margin-top: 1.875rem;

		@media (max-width: 1024px) {
			margin-top: 0.25rem;
		}

		&-inner {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #f1d9bd;
			border-radius: 0.9375rem;

			font-weight: 600;
			font-size: 1.4375rem;
			line-height: 1.8125rem;
			color: #302d2e;
			padding: 1.25rem 1.875rem;
			transition: all 0.3s ease;

			@media (max-width: 1024px) {
				padding: 0.71rem 1.0649rem;
				border-radius: 0.5325rem;
				font-weight: 600;
				font-size: 0.8125rem;
				line-height: 1.0625rem;
			}
		}
		&:hover .home-slider__button-inner {
			background: #ff6800;
			color: #f1d9bd;
		}
		&-image {
			position: absolute;
			z-index: -1;
			top: -3rem;
			left: calc(100% - 1rem);
			width: 6.25rem;
			height: 6.25rem;
			transform-origin: left center;
			transition: none; // Disable transitions for instant changes
			@media (max-width: 1024px) {
				position: absolute;
				width: 3.3194rem;
				top: -1.3rem;
				left: calc(100% - 0.5rem);
				height: 3.5631rem;
			}
		}
	}

	.plane-game-plane {
		position: absolute;
		filter: drop-shadow(3.30353px 8.07531px 7.15766px rgba(0, 0, 0, 0.26));
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		&._1 {
			position: absolute;
			width: 8.0944rem;
			height: 11.8306rem;
			left: 44.25rem;
			top: -2rem;
			transform: rotate(-135deg);
			img {
				animation: plane-horizontal-move 7s ease infinite alternate;
			}

			@media (max-width: 1024px) {
				position: absolute;
				width: 4.155rem;
				height: 6.0725rem;
				left: 7.6875rem;
				top: -1.1875rem;

				filter: drop-shadow(
					0.2887rem 0.7057rem 0.6256rem rgba(0, 0, 0, 0.26)
				);
				transform: rotate(-135deg);
			}
		}
		&._2 {
			position: absolute;
			width: 2.9712rem;
			height: 4.3425rem;
			left: 36.75rem;
			top: 15.6875rem;

			filter: drop-shadow(
				3.30353px 8.07531px 7.15766px rgba(0, 0, 0, 0.26)
			);
			transform: rotate(-45deg);

			img {
				animation: plane-horizontal-move 10s ease infinite alternate;
			}
		}
	}
}
</style>
