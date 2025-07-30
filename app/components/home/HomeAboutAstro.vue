<template>
	<div class="about-astro">
		<div class="about-astro__main">
			<h3 class="about-astro__title">About Astro</h3>
			<p class="about-astro__text">
				Astro is a revolutionary P2E platform where players join a
				vibrant community to enjoy immersive games Earn $AST rewards.
				<br /><br />
				Built on innovation, it offers a unique gaming ecosystem
				designed for both fun and Web3 growth.
			</p>
		</div>
		<div class="about-astro__image-wrapper">
			<img
				src="~/assets/images/about-astro-image.svg"
				alt=""
				class="about-astro__image"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.about-astro {
	left: 36.0625rem;
	top: 108.4375rem;
	background: #ff6800;
	border-radius: 3.125rem;
	padding: 2.9375rem 2.25rem 2.9375rem 3.125rem;
	color: #302d2e;

	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 1024px) {
		background: #ff6800;
		border-radius: 1.5625rem;
		padding: 1.25rem;
		flex-direction: column;
	}
	&__title {
		margin-bottom: 0.9375rem;

		font-family: 'TT Norms Pro Expanded';
		font-style: normal;
		font-weight: 700;
		font-size: 2.5rem;
		line-height: 3.1875rem;

		@media (max-width: 1024px) {
			font-weight: 700;
			font-size: 1.25rem;
			line-height: 1.625rem;
		}
	}

	&__text {
		font-weight: 500;
		font-size: 1.25rem;
		line-height: 1.625rem;
		max-width: 35rem;
		color: #302d2e;
		@media (max-width: 1024px) {
			font-size: 0.75rem;
			line-height: 0.9375rem;
		}
	}

	&__image-wrapper {
		height: 18.1369rem;
		@media (max-width: 1024px) {
			height: auto;
		}
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>
