<template>
	<div class="game-cards-block">
		<!-- <div class="game-cards-block__items"> -->
		<GameCardsBlockPlanesCard />
		<GameCardsBlockComingSoonCard />
		<GameCardsBlockComingSoonCard />
		<!-- </div> -->
	</div>
</template>

<script lang="ts" setup>
import GameCardsBlockComingSoonCard from './GameCardsBlockComingSoonCard.vue';
import GameCardsBlockPlanesCard from './GameCardsBlockPlanesCard.vue';
</script>

<style lang="scss" scoped>
.game-cards-block {
	display: grid;
	grid-template-columns: 35rem 1fr 1fr;
	gap: 1.875rem;
	@media (max-width: 1024px) {
		gap: 0.9375rem;
		grid-template-columns: calc(100vw - 4rem) calc(33vw) calc(33vw);
	}
}
</style>
