<template>
	<MainLayout>
		<PageTitle class="mb-1-25"> Settings </PageTitle>
		<div class="main">
			<h3 class="title">
				<template v-if="user">
					Username ID:
					<span>
						{{ formatAddress(user?.address) }}
					</span>
				</template>
				<template v-else>
					Please connect your wallet to earn Astro Points.
				</template>
			</h3>
			<button
				v-if="user"
				@click="userStore.logout"
				class="app-disconnect-button"
			>
				Disconnect Wallet
			</button>
			<ClientOnly v-else>
				<AppWalletButton class="app-wallet-button" />
			</ClientOnly>
		</div>
	</MainLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import MainLayout from '~/layouts/MainLayout.vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

useHead({
	title: 'Astro Games - Tutorial',
	meta: [
		{
			name: 'description',
			content:
				'Welcome to Astro Games - discover amazing games built with modern web technologies.'
		}
	]
});
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 3.125rem;
	gap: 0.9375rem;

	background: linear-gradient(0deg, #302d2e, #302d2e), #f0f0f0;
	border-radius: 3.125rem;

	color: #f1d9bd;

	@media (max-width: 1024px) {
		flex-direction: column;
		padding: 1.25rem;
		gap: 1rem;
		border-radius: 1.5625rem;
	}
}
.title {
	font-family: 'TT Norms Pro';
	font-weight: 600;
	font-size: 1.4375rem;
	line-height: 1.8125rem;

	span {
		margin-left: 2rem;
	}

	@media (max-width: 1024px) {
		font-size: 0.875rem;
		line-height: 1.125rem;
	}
}

.app-disconnect-button {
	padding: 0.9375rem 1.5625rem;
	gap: 0.625rem;
	background: #ff6800;
	border-radius: 0.9375rem;
	color: #fff;
	font-weight: 600;
	font-size: 1.25rem;
	line-height: 1.625rem;
	transition: background-color 0.3s ease, color 0.3s ease;

	&:hover {
		background: #f1d9bd;
		color: #302d2e;
	}
	@media (max-width: 1024px) {
		font-weight: 600;
		font-size: 0.875rem;
		line-height: 1.125rem;

		padding: 0.625rem 0.9375rem;
		border-radius: 0.625rem;
	}
}
</style>
