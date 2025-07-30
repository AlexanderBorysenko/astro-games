<template>
	<div class="home-encourage-section">
		<p class="home-encourage-section__pretitle">$AST</p>
		<h2 class="home-encourage-section__title">
			An actual chance to earn in crypto Welcome to AstroGames
		</h2>
		<p class="home-encourage-section__description">
			Compete against players worldwide, climb the leaderboards, and
			secure exclusive $AST rewards. The fight for the top spot starts
			now, prove you're the best!
		</p>
		<img
			ref="decorationRef"
			src="~/assets/images/home-encourage-section-decoration.svg"
			alt=""
			class="home-encourage-section__decoration"
		/>
	</div>
</template>

<script lang="ts" setup>
// Use the reusable animation composable
const decorationAnimation = useElementAnimation({
	interval: 400,
	rotation: { min: -10, max: 10 },
	scale: { min: 0.8, max: 1.1 }
});

// Extract the ref for easier template usage
const { elementRef: decorationRef } = decorationAnimation;
</script>

<style lang="scss" scoped>
.home-encourage-section {
	color: #302d2e;
	position: relative;
	&__pretitle {
		font-family: 'TT Norms Pro Expanded';
		font-weight: 950;
		font-size: 1.25rem;
		line-height: 1.625rem;
		padding-bottom: 0.5rem;
		border-bottom: 0.375rem solid #302d2e;
		margin-bottom: 1.1875rem;
		margin-bottom: 0.625rem;
		@media (max-width: 1024px) {
		}
	}

	&__title {
		max-width: 57.75rem;
		font-family: 'TT Norms Pro Expanded';
		font-style: normal;
		font-weight: 900;
		font-size: 2.9375rem;
		line-height: 120%;
		color: #302d2e;
		margin-bottom: 1.75rem;
		@media (max-width: 1024px) {
			font-family: 'TT Norms Pro Expanded';
			font-style: normal;
			font-weight: 900;
			font-size: 0.875rem;
			line-height: 120%;
			color: #302d2e;
			margin-bottom: 0.75rem;
		}
	}

	&__description {
		max-width: 45.875rem;

		font-family: 'TT Norms Pro';
		font-style: normal;
		font-weight: 400;
		font-size: 1.25rem;
		line-height: 1.625rem;
		color: #302d2e;
		@media (max-width: 1024px) {
			font-family: 'TT Norms Pro';
			font-style: normal;
			font-size: 0.75rem;
			line-height: 0.9375rem;
			color: #302d2e;
			max-width: 13.375rem;
		}
	}
	&__decoration {
		position: absolute;
		width: 13rem;
		height: 13.0275rem;
		left: 52.4375rem;
		top: 5.2081rem;
		transform-origin: bottom center;
		transition: none; // Disable transitions for instant changes
		@media (max-width: 1024px) {
			position: absolute;
			width: 5.7719rem;
			height: 5.7838rem;
			left: 12.1181rem;
			top: 4.8044rem;
			transform: rotate(7.28deg);
		}
	}
}
</style>
