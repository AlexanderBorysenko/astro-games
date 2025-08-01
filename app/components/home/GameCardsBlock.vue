<template>
	<div class="game-cards-block">
		<div
			ref="listRef"
			class="game-cards-block__list"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
			@mousedown="handleMouseDown"
			@mousemove="handleMouseMove"
			@mouseup="handleMouseEnd"
			@mouseleave="handleMouseEnd"
			:style="{ transform: `translateX(${translateX}px)` }"
		>
			<GameCardsBlockPlanesCard />
			<GameCardsBlockComingSoonCard />
			<GameCardsBlockComingSoonCard />
		</div>
		<!-- <div class="game-cards-block__items"> -->
		<!-- </div> -->
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import GameCardsBlockComingSoonCard from './GameCardsBlockComingSoonCard.vue';
import GameCardsBlockPlanesCard from './GameCardsBlockPlanesCard.vue';

const listRef = ref<HTMLElement | null>(null);
const translateX = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const currentX = ref(0);
const initialTranslateX = ref(0);
const maxTranslateX = ref(0);

// Touch events
const handleTouchStart = (e: TouchEvent) => {
	if (window.innerWidth > 1024 || !e.touches[0]) return;

	isDragging.value = true;
	startX.value = e.touches[0].clientX;
	initialTranslateX.value = translateX.value;

	// Add transition class removal for smooth dragging
	if (listRef.value) {
		listRef.value.style.transition = 'none';
	}
};

const handleTouchMove = (e: TouchEvent) => {
	if (!isDragging.value || window.innerWidth > 1024 || !e.touches[0]) return;

	e.preventDefault();
	currentX.value = e.touches[0].clientX;
	const deltaX = currentX.value - startX.value;

	const newTranslateX = initialTranslateX.value + deltaX;
	translateX.value = Math.max(
		Math.min(newTranslateX, 0),
		-maxTranslateX.value
	);
};

const handleTouchEnd = () => {
	if (!isDragging.value || window.innerWidth > 1024) return;

	isDragging.value = false;

	// Add transition back for smooth snapping
	if (listRef.value) {
		listRef.value.style.transition = 'transform 0.3s ease-out';
	}
};

// Mouse events (for desktop testing)
const handleMouseDown = (e: MouseEvent) => {
	if (window.innerWidth > 1024) return;

	isDragging.value = true;
	startX.value = e.clientX;
	initialTranslateX.value = translateX.value;

	if (listRef.value) {
		listRef.value.style.transition = 'none';
		listRef.value.style.cursor = 'grabbing';
	}
};

const handleMouseMove = (e: MouseEvent) => {
	if (!isDragging.value || window.innerWidth > 1024) return;

	e.preventDefault();
	currentX.value = e.clientX;
	const deltaX = currentX.value - startX.value;

	const newTranslateX = initialTranslateX.value + deltaX;
	translateX.value = Math.max(
		Math.min(newTranslateX, 0),
		-maxTranslateX.value
	);
};

const handleMouseEnd = () => {
	if (!isDragging.value || window.innerWidth > 1024) return;

	isDragging.value = false;

	if (listRef.value) {
		listRef.value.style.transition = 'transform 0.3s ease-out';
		listRef.value.style.cursor = 'grab';
	}
};

// Calculate max scroll distance
const calculateMaxTranslate = () => {
	if (!listRef.value || window.innerWidth > 1024) {
		maxTranslateX.value = 0;
		return;
	}

	const containerWidth = listRef.value.parentElement?.clientWidth || 0;
	const scrollWidth = listRef.value.scrollWidth;
	maxTranslateX.value = Math.max(0, scrollWidth - containerWidth);
};

// Handle window resize
const handleResize = () => {
	calculateMaxTranslate();

	// Reset transform on desktop
	if (window.innerWidth > 1024) {
		translateX.value = 0;
		if (listRef.value) {
			listRef.value.style.transition = 'none';
		}
	}
};

onMounted(() => {
	calculateMaxTranslate();
	window.addEventListener('resize', handleResize);

	// Set initial cursor style for mobile
	if (listRef.value && window.innerWidth <= 1024) {
		listRef.value.style.cursor = 'grab';
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
.game-cards-block {
	@media (max-width: 1024px) {
		width: 100%;
		position: relative;
	}

	&__list {
		display: grid;
		grid-template-columns: 35rem 1fr 1fr;
		gap: 1.875rem;

		@media (max-width: 1024px) {
			gap: 0.9375rem;
			grid-template-columns: calc(100vw - 4rem) calc(33vw) calc(33vw);
			width: max-content;
			min-width: 100%;
			user-select: none;
			-webkit-user-select: none;
			-webkit-touch-callout: none;
			-webkit-tap-highlight-color: transparent;
			will-change: transform;

			&:active {
				cursor: grabbing;
			}
		}
	}
}
</style>
