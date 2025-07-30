<template>
	<div class="app-aside">
		<div class="app-aside__points app-aside__section">
			<AppAstroPointsCount />
		</div>

		<nav class="app-aside__section app-aside__menu">
			<NuxtLink
				v-for="item in menuItems"
				:key="item.name"
				:to="item.path"
				class="app-aside__menu-item"
				:class="{
					'app-aside__menu-item--active': $route.path === item.path
				}"
			>
				<span>{{ item.name }}</span>
				<SvgIcon :name="item.icon" class="app-aside__icon" />
			</NuxtLink>
		</nav>

		<div class="app-aside__section app-aside__menu">
			<NuxtLink
				to="/contact-us"
				class="app-aside__menu-item"
				:class="{
					'app-aside__menu-item--active':
						$route.path === '/contact-us'
				}"
			>
				<span>Contact us</span>
				<SvgIcon name="menu-contact" class="app-aside__icon" />
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import AppAstroPointsCount from './AppAstroPointsCount.vue';

const menuItems = [
	{ name: 'Games', path: '/games', icon: 'menu-games' },
	{ name: 'Leaderboards', path: '/leaderboards', icon: 'menu-leaderboards' },
	{ name: 'Convert', path: '/convert', icon: 'menu-convert' },
	{ name: 'Airdrop', path: '/airdrop', icon: 'menu-airdrop' },
	{ name: 'Tasks', path: '/tasks', icon: 'menu-tasks' },
	{ name: 'Settings', path: '/settings', icon: 'menu-settings' }
];
</script>

<style scoped lang="scss">
.app-aside {
	display: flex;
	flex-direction: column;
	color: #fff;
	gap: 1rem;

	font-size: 1.25rem;
	line-height: 100%;
	font-weight: 500;
	font-family: 'TT Norms Pro';

	&__section {
		padding: 1.25rem 1.5625rem;
		background: #302d2e;
		border-radius: 1.25rem;
	}

	&__icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	&__points {
		@media (max-width: 1024px) {
			display: none;
		}
	}

	&__contact {
		padding: 1rem 0.75rem;
	}

	&__menu-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.4375rem 0;
		border-radius: 0.625rem;
		color: #fff;
		text-decoration: none;
		transition: all 0.2s ease;

		&:hover {
			color: #ff6800;
			@media (min-width: 1024px) {
				transform: scale(1.05);
			}
			svg {
			}
		}
		&:first-child {
			padding-top: 0;
		}
		&:last-child {
			padding-bottom: 0;
		}

		&--active {
			color: #ff6800;
		}
	}
}
</style>
