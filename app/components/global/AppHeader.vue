<template>
	<div class="app-header">
		<header class="app-header__main">
			<h1 class="logo">
				<NuxtLink to="/" class="logo">Astro Games</NuxtLink>
			</h1>
			<div class="app-header__socials">
				<a
					:href="TELEGRAM_LINK"
					target="_blank"
					class="app-header__social-link"
				>
					<SvgIcon name="social-telegram" />
				</a>
				<a
					:href="X_LINK"
					target="_blank"
					class="app-header__social-link"
				>
					<SvgIcon name="social-x" />
				</a>
			</div>
			<ClientOnly>
				<AppWalletButton class="app-header__wallet-button" />
			</ClientOnly>
			<AppMobileMenuToggleButton class="app-header__mobile-menu-toggle" />
		</header>
		<div class="app-header__points-count-wrapper">
			<AppAstroPointsCount class="app-header__points-count" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { TELEGRAM_LINK, X_LINK } from '~/constants';
import SvgIcon from './SvgIcon.vue';
import AppWalletButton from './AppWalletButton.vue';
import AppAstroPointsCount from './AppAstroPointsCount.vue';
</script>

<style scoped lang="scss">
.app-header {
	&__main {
		display: flex;
		align-items: center;
	}
	&__points-count-wrapper {
		padding: 0.625rem 0.9375rem;
		background: #302d2e;
		border-radius: 1.25rem;
		display: none;
		margin-top: 0.875rem;
		@media (max-width: 1024px) {
			display: block !important;
		}
	}
}

.logo {
	font-family: 'TT Norms Pro Expanded';
	font-weight: 700;
	font-size: 1.5625rem;
	line-height: 2rem;
	color: #302d2e;
	margin-right: auto;
	a {
		letter-spacing: -0.04em;
	}
	@media (max-width: 1024px) {
		font-size: 1rem;
		line-height: 1.25rem;
	}
}

.app-header__socials {
	display: flex;
	gap: 0.625rem;
	align-items: center;
}

.app-header__social-link {
	width: 2.75rem;
	height: 2.75rem;

	background: #302d2e;
	border-radius: 50%;

	display: flex;
	align-items: center;
	justify-content: center;

	color: #f1d9bd;
	svg {
		width: 1.25rem;
	}

	transition: background-color 0.3s ease, color 0.3s ease,
		box-shadow 0.3s ease, transform 0.3s ease;

	&:hover {
		background: #ff6800;
		color: #fff;
		transform: scale(1.05);
	}

	@media (max-width: 1024px) {
		display: none;
	}
}

.app-header__wallet-button {
	margin-left: 1.25rem;
}

.app-header__mobile-menu-toggle {
	display: none;
	@media (max-width: 1024px) {
		display: block;
		margin-left: 0.625rem;
	}
}
</style>
