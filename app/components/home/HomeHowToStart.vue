<template>
	<div class="how-to-start">
		<img
			src="~/assets/images/home-how-to-start-decoration.png"
			alt=""
			class="how-to-start__decoration"
		/>
		<h3 class="how-to-start__title">New to Astro?</h3>
		<p class="how-to-start__text">
			Discover how to create your account, explore games, and begin
			earning $AST rewards to your wallet with our simple guide.
		</p>
		<NuxtLink class="how-to-start__button" to="/tutorial">
			<img src="~/assets/images/how-to-start-button-icon.png" alt="" />
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.how-to-start {
	color: #f1d9bd;
	position: relative;
	padding: 3rem 3rem 2.875rem 3.125rem;
	min-height: 20.75rem;
	background: #302d2e;
	border-radius: 3.125rem;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	@media (max-width: 1024px) {
		background: #302d2e;
		border-radius: 1.5625rem;
		padding: 1.25rem;
		min-height: 15.4375rem;
	}

	&__decoration {
		position: absolute;
		width: 35.8612rem;
		height: 36.7575rem;
		right: -5rem;
		top: -1.4rem;

		transform: matrix(-0.5, -0.87, -0.87, 0.5, 0, 0);
		@media (max-width: 1024px) {
			width: 14.25rem;
			height: 14.25rem;
			top: unset;
			right: -2.5rem;
			bottom: -6rem;
		}
	}
	&__title {
		font-family: 'TT Norms Pro Expanded';
		font-weight: 700;
		font-size: 2.5rem;
		line-height: 3.1875rem;
		margin-bottom: 0.9375rem;

		@media (max-width: 1024px) {
			font-family: 'TT Norms Pro Expanded';
			font-weight: 700;
			font-size: 1.25rem;
			line-height: 1.625rem;
		}
	}

	&__text {
		max-width: 33.75rem;
		font-style: normal;
		font-weight: 500;
		font-size: 1.5625rem;
		line-height: 2rem;
		margin-bottom: 2rem;

		@media (max-width: 1024px) {
			font-weight: 500;
			font-size: 0.75rem;
			line-height: 0.9375rem;
		}
	}

	&__button {
		transition: all 0.3s ease;
		width: 5.9375rem;
		display: block;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		&:hover {
			transform: scale(1.1);
			filter: brightness(1.1);
		}

		@media (max-width: 1024px) {
			width: 2.6875rem;
			margin-top: auto;
		}
	}
}
</style>
