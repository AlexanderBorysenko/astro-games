<template>
	<div class="app-footer">
		<p class="app-footer__logo">AstroGame</p>
		<ul class="app-footer__menu">
			<li
				class="app-footer__menu-item"
				v-for="item in menuItems"
				:key="item.name"
			>
				<NuxtLink :to="item.path">
					{{ item.name }}
				</NuxtLink>
			</li>
		</ul>
		<div class="app-footer__socials">
			<a
				:href="TELEGRAM_LINK"
				target="_blank"
				class="app-footer__social-link"
			>
				<SvgIcon
					name="social-telegram"
					class="app-footer__social-icon"
				/>
			</a>
			<NuxtLink to="/tutorial" class="app-footer__social-link _tutorial">
				<img
					src="~assets/images/tutorial-icon.png"
					alt=""
					class="app-footer__social-icon _tutorial"
				/>
			</NuxtLink>
			<a :href="X_LINK" target="_blank" class="app-footer__social-link">
				<SvgIcon name="social-x" class="app-footer__social-icon" />
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { TELEGRAM_LINK, X_LINK } from '~/constants';

const menuItems = [
	{ name: '2025 Astro', path: '#' },
	{ name: 'Contact', path: '/contact' },
	{ name: 'Terms', path: '/terms' },
	{ name: 'FAQ', path: '/#faq' }
];
</script>

<style scoped lang="scss">
.app-footer {
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	@media (max-width: 1024px) {
		justify-content: center;
	}

	&__logo {
		font-family: 'TT Norms Pro Expanded';
		font-style: normal;
		font-weight: 700;
		font-size: 1.5625rem;
		line-height: 2rem;
		color: #302d2e;
	}

	&__menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: 7.25rem;
		gap: 3.125rem;
		@media (max-width: 1024px) {
			margin-left: 0;
			max-width: 14.75rem;
			margin-top: 0.875rem;
			column-gap: 1.875rem;
			row-gap: 0.875rem;
		}
	}

	&__menu-item {
		font-family: 'TT Norms Pro';
		font-style: normal;
		font-weight: 500;
		font-size: 1.5625rem;
		line-height: 2rem;
		&:hover {
			text-decoration: underline;
		}
		@media (max-width: 1024px) {
			font-family: 'TT Norms Pro';
			font-style: normal;
			font-weight: 500;
			font-size: 0.875rem;
			line-height: 1.125rem;
			color: #000000;
		}
	}

	&__socials {
		display: flex;
		gap: 1rem;
		margin-left: auto;
		@media (max-width: 1024px) {
			margin-left: 0;
			margin-top: 1.875rem;
		}
	}

	&__social-link {
		width: 3.75rem;
		height: 3.75rem;
		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 0.9375rem;

		transition: background-color 0.3s ease, color 0.3s ease,
			transform 0.3s ease;
		&._tutorial {
			background: #ff6800;
		}

		&:hover {
			background-color: #ee5f00;
			color: #fff;
			transform: scale(1.1);
		}

		@media (max-width: 1024px) {
			background: #302d2e !important;
			color: #fff;
		}
	}

	&__social-icon {
		max-width: 1.875rem;
		&._tutorial {
			// make it white using filters
			filter: brightness(0) invert(1);
		}
	}
}
</style>
