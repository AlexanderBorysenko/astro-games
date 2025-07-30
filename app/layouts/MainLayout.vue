<script setup lang="ts">
import AppFooter from '~/components/global/AppFooter.vue';
import AppHeader from '~/components/global/AppHeader.vue';
</script>

<template>
	<div class="main-layout">
		<AppHeader class="header" />
		<AppMobileNavigation class="mobile-navigation" />
		<div class="main-layout__body">
			<AppAside class="app-aside" />
			<div class="main-content">
				<slot />
			</div>
		</div>
		<AppFooter class="app-footer" />
	</div>
</template>

<style scoped lang="scss">
.header {
	margin-bottom: 2.5rem;
	margin-top: 1rem;
	@media (max-width: 1024px) {
		margin-top: 1.1875rem;
		margin-bottom: 1.5rem;
	}
}
.main-layout {
	max-width: 82.125rem;
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	&__body {
		display: grid;
		gap: 3.375rem;
		grid-template-columns: 13.75rem 1fr;
		margin-bottom: 2.5rem;
		@media (max-width: 1024px) {
			gap: 1.25rem;
		}
	}
	@media (max-width: 1024px) {
		padding: 0 1rem;
	}
}

.header {
	position: relative;
	z-index: 10;
}
.mobile-navigation {
	z-index: 9;
}

.app-aside {
	@media (max-width: 1024px) {
		display: none;
	}
}

.main-content {
	width: 64.9375rem;
	@media (max-width: 1024px) {
		width: calc(100vw - 2rem);
	}
}

.app-footer {
	margin-top: auto;
	margin-bottom: 2rem;
	@media (max-width: 1024px) {
	}
}
</style>
