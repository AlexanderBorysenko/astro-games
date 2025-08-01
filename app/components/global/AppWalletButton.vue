<template>
	<component
		:is="isLoggedIn && user ? NuxtLink : 'button'"
		:to="isLoggedIn && user ? '/settings' : undefined"
		class="app-wallet-button"
		@click="handleClick"
		:disabled="isDisabled"
		:class="{ _connected: isLoggedIn && user }"
	>
		<SvgIcon
			v-if="isLoggedIn && user"
			name="phantom"
			class="app-wallet-button__icon"
		/>
		<span v-if="!isInitialized">Loading...</span>
		<span v-else-if="connecting">Connecting...</span>
		<span v-else-if="isLoggedIn && user">
			{{ formatAddress(user.address) }}
		</span>
		<span v-else>Connect Wallet</span>
	</component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { storeToRefs } from 'pinia';

const walletStore = useWalletStore();
const { connecting } = storeToRefs(walletStore);

const userStore = useUserStore();
const { user, isLoggedIn, isInitialized } = storeToRefs(userStore);

const isDisabled = computed(() => connecting.value || !isInitialized.value);

const handleClick = () => {
	if (isLoggedIn.value && user.value) {
		// Navigation is handled by NuxtLink
		return;
	}

	if (!isLoggedIn.value) {
		walletStore.connectWallet();
	}
};
</script>

<style scoped lang="scss">
.app-wallet-button {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0.9375rem 1.5625rem;
	gap: 0.625rem;

	background: var(--background, #302d2e);
	border-radius: 0.9375rem;
	border: none;

	display: flex;
	align-items: center;
	font-family: 'TT Norms Pro';
	font-weight: 600;
	font-size: 1.25rem;
	line-height: 1.625rem;
	color: var(--color, #f1d9bd);

	transition: background-color 0.3s ease, color 0.3s ease;
	cursor: pointer;
	&__icon {
		width: 2.125rem;
		height: 2.125rem;
		@media (max-width: 1024px) {
			width: 1.25rem;
			height: 1.25rem;
		}
	}

	&:hover:not(:disabled) {
		background: #ff6800;
		color: #f1d9bd;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 1024px) {
		padding: 0.5rem;
		background: #ff6800;
		border-radius: 0.625rem;

		font-weight: 500;
		font-size: 0.8125rem;
		line-height: 1.0625rem;
		color: #ffffff;
	}
}
</style>
