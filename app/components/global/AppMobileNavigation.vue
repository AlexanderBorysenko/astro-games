<template>
	<div
		class="app-mobile-navigation"
		:class="{ 'is-opened': getIsMobileMenuOpened() }"
	>
		<div class="app-mobile-navigation__inner">
			<AppAside class="app-aside" />
			<AppFooter class="app-footer" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import AppFooter from './AppFooter.vue';

const { getIsMobileMenuOpened } = useAppStore();
</script>

<style lang="scss">
.app-mobile-navigation {
	display: none;
	position: fixed;
	transform: translateX(-100%);
	transition: transform 0.3s ease;
	inset: 0;
	// background: #f1d9bd;
	background: #f1d9bd;
	padding: 8rem 1rem 1rem 1rem;
	&.is-opened {
		transform: translateX(0);
	}
	&__inner {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		overflow-y: auto;
		height: 100%;
	}
	@media (max-width: 1024px) {
		display: block;
	}
}
.app-footer {
	margin-top: auto;
}
</style>
