<template>
	<div class="earn-astro-points">
		<div class="earn-astro-points__main">
			<h2 class="earn-astro-points__title">Astro points</h2>
			<p class="earn-astro-points__text">
				Earn additional Astro Points by completing community tasks
			</p>
			<NuxtLink to="/convert" class="earn-astro-points__button">
				Earn now
			</NuxtLink>
		</div>
		<div class="earn-astro-points__image-wrapper">
			<img src="~/assets/images/astro-points-image.png" alt="" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components';
</script>

<style lang="scss" scoped>
.earn-astro-points {
	background: #302d2e;
	color: #f1d9bd;
	border-radius: 3.125rem;

	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	@media (max-width: 1024px) {
		background: #302d2e;
		border-radius: 1.5625rem;
		padding: 1.25rem;
		align-items: unset;
		flex-direction: column;
		min-height: 15.4375rem;
	}

	&__main {
		padding: 3.125rem;
		flex: 33.75rem 0 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		@media (max-width: 1024px) {
			padding: 0;
			flex: 1;
		}
	}

	&__title {
		font-family: 'TT Norms Pro Expanded';
		font-style: normal;
		font-weight: 700;
		font-size: 2.5rem;
		line-height: 3.1875rem;
		margin-bottom: 0.9375rem;

		@media (max-width: 1024px) {
			font-size: 1.25rem;
			line-height: 1.625rem;
		}
	}

	&__text {
		font-family: 'TT Norms Pro';
		font-weight: 500;
		font-size: 1.5625rem;
		line-height: 2rem;
		width: 100%;
		color: #f1d9bd;
		@media (max-width: 1024px) {
			font-weight: 500;
			font-size: 0.75rem;
			line-height: 0.9375rem;
			max-width: 10.625rem;
		}
	}

	&__button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem 1.875rem;
		gap: 0.625rem;
		background: #f1d9bd;
		border-radius: 0.9375rem;
		margin-top: 2.25rem;
		width: fit-content;

		font-weight: 600;
		font-size: 1.4375rem;
		line-height: 1.8125rem;
		color: #302d2e;
		transition: background-color 0.3s ease, color 0.3s ease;
		&:hover {
			background: #ff6800;
			color: #fff;
		}
		@media (max-width: 1024px) {
			padding: 0.71rem 1.0649rem;
			background: #f1d9bd;
			border-radius: 0.5325rem;
			font-weight: 600;
			font-size: 0.8125rem;
			line-height: 1.0625rem;
			margin-top: auto;
			z-index: 2;
		}
	}

	&__image-wrapper {
		flex: 1;
		IMG {
			width: 100%;
			height: auto;
			object-fit: contain;
		}
		@media (max-width: 1024px) {
			// flip vertical
			transform: scaleX(-1);
			position: absolute;
			bottom: 0;
			right: 0;
			width: 70%;
		}
	}
}
</style>
