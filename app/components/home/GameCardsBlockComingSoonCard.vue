<template>
	<div class="game-card-block-coming-soon-card">
		<img
			class="game-card-block-coming-soon-card__bar"
			src="~/assets/images/soon-bar.svg"
			alt="Coming soon"
		/>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.game-card-block-coming-soon-card {
	width: 100%;
	height: 100%;
	background: #302d2e;
	border-radius: 3.125rem;
	display: flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 1024px) {
		border-radius: 1.5625rem;
	}
}
</style>
