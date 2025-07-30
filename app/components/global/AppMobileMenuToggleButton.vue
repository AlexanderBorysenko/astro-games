<template>
	<button
		@click="toggleIsMobileMenuOpened"
		class="mobile-menu-toggle"
		aria-label="Toggle mobile menu"
	>
		<!-- Hamburger menu icon -->
		<svg
			v-if="!getIsMobileMenuOpened()"
			width="37"
			height="37"
			viewBox="0 0 37 37"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="37" height="37" rx="10" fill="#302D2E" />
			<rect x="8.5" y="11" width="20" height="4" rx="2" fill="#F1D9BD" />
			<rect x="8.5" y="22" width="20" height="4" rx="2" fill="#F1D9BD" />
		</svg>

		<!-- Close icon (X) -->
		<svg
			v-else
			width="37"
			height="37"
			viewBox="0 0 37 37"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="37" height="37" rx="10" fill="#302D2E" />
			<rect
				x="12.9287"
				y="10.0857"
				width="20"
				height="4"
				rx="2"
				transform="rotate(45 12.9287 10.0857)"
				fill="#F1D9BD"
			/>
			<rect
				x="9.92871"
				y="24.0857"
				width="20"
				height="4"
				rx="2"
				transform="rotate(-45 9.92871 24.0857)"
				fill="#F1D9BD"
			/>
		</svg>
	</button>
</template>

<script lang="ts" setup>
const { toggleIsMobileMenuOpened, getIsMobileMenuOpened } = useAppStore();
</script>

<style scoped lang="scss">
.mobile-menu-toggle {
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	width: 2.3125rem;
	height: 2.3125rem;
	svg {
		width: 100%;
		height: 100%;
	}
}

.mobile-menu-toggle:hover {
	opacity: 0.8;
}

.mobile-menu-toggle:active {
	transform: scale(0.95);
}
</style>
