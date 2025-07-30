<template>
	<MainLayout>
		<PageTitle class="mb-1-25"> Leaderboards </PageTitle>
		<div class="leaderboard">
			<div class="leaderboard__head">
				<p class="leaderboard__head-text">
					Track your Astro Points earned from dominating "Planeys" and
					compete with players worldwide to secure the top spot. Climb
					the ranks, showcase your skills
				</p>
				<div class="leaderboard__your-place" v-if="currentUserPosition">
					Your Place
					<strong>{{ currentUserPosition.position }}</strong>
				</div>
				<div class="leaderboard__your-place" v-else-if="user?.address">
					Your Place <strong>Loading...</strong>
				</div>
				<div class="leaderboard__your-place" v-else>
					Your Place <strong>-</strong>
				</div>
			</div>
			<div class="leaderboard__text">
				The top players will earn exclusive additional rewards, giving
				you extra incentive to dominate. Compete, rise to the top, and
				claim your prizes!
				<button
					class="leaderboard__refresh-btn"
					@click="refreshLeaderboard"
					:disabled="isLoading"
				>
					{{ isLoading ? 'Loading...' : 'Refresh Leaderboard' }}
				</button>
			</div>
			<ul
				class="leaderboard__players"
				v-if="!isLoading && displayPlayers.length > 0"
			>
				<li
					v-for="(player, index) in displayPlayers"
					:key="player.id || index"
					class="leaderboard__player"
				>
					<span class="leaderboard__player-name"
						>#{{ player.position }}.
						{{
							formatPlayerName(player.address, player.position)
						}}</span
					>
					<span class="leaderboard__player-points"
						>{{ formatPoints(player.points_count) }} Points</span
					>
				</li>
			</ul>
			<div
				v-else-if="!isLoading && displayPlayers.length === 0"
				class="leaderboard__empty"
			>
				No players on the leaderboard yet. Be the first to earn points!
			</div>
			<div v-else-if="isLoading" class="leaderboard__loading">
				Loading leaderboard...
			</div>
			<div v-else-if="error" class="leaderboard__error">
				{{ error }}
			</div>
		</div>
	</MainLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import MainLayout from '~/layouts/MainLayout.vue';

const userStore = useUserStore();
const { isLoggedIn, user } = storeToRefs(userStore);

// Use leaderboard composable
const {
	topPlayers,
	currentUserPosition,
	isLoading,
	error,
	fetchLeaderboard,
	refreshLeaderboard,
	formatPlayerName,
	formatPoints
} = useLeaderboard();

// Create display players array (fallback to mock data if no real data)
const displayPlayers = computed(() => {
	if (topPlayers.value.length > 0) {
		return topPlayers.value;
	}
	return [];
});

// Fetch leaderboard data when component mounts and user is available
onMounted(async () => {
	if (user.value?.address) {
		await fetchLeaderboard(user.value.address);
	}
});

// Watch for user changes to refetch data
watch(
	() => user.value?.address,
	async newAddress => {
		if (newAddress) {
			await fetchLeaderboard(newAddress);
		}
	}
);

useHead({
	title: 'Astro Games - Leaderboards',
	meta: [
		{
			name: 'description',
			content:
				'Join the Astro Games leaderboards to compete with players worldwide and earn exclusive rewards.'
		}
	]
});
</script>

<style lang="scss" scoped>
.leaderboard {
	padding: 3.125rem;
	background: linear-gradient(0deg, #302d2e, #302d2e), #f0f0f0;
	border-radius: 3.125rem;
	color: #f1d9bd;

	@media (max-width: 1024px) {
		padding: 1.25rem;
		border-radius: 1.5625rem;
	}

	&__head {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.875rem;
		@media (max-width: 1024px) {
			flex-direction: column-reverse;
			margin-bottom: 1.25rem;
		}
	}

	&__head-text {
		max-width: 33.875rem;
		font-family: 'TT Norms Pro';
		font-style: normal;
		font-weight: 500;
		font-size: 1.25rem;
		line-height: 1.625rem;
		@media (max-width: 1024px) {
			font-size: 0.875rem;
			line-height: 1.125rem;
		}
	}

	&__your-place {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5625rem;
		gap: 0.625rem;
		background: #f1d9bd;
		border-radius: 0.9375rem;
		color: #302d2e;
		font-weight: 500;
		font-size: 1.25rem;
		line-height: 1.625rem;
		strong {
			color: #ff6800;
		}

		@media (max-width: 1024px) {
			padding: 0.625rem 0.9375rem;
			gap: 0.625rem;
			border-radius: 0.9375rem;
			font-weight: 500;
			font-size: 0.9375rem;
			line-height: 1.1875rem;
			margin-bottom: 0.625rem;
		}
	}

	&__text {
		max-width: 51.875rem;
		font-style: normal;
		font-weight: 450;
		font-size: 1.25rem;
		line-height: 1.625rem;
		@media (max-width: 1024px) {
			font-weight: 450;
			font-size: 0.875rem;
			line-height: 1.125rem;
		}
	}

	&__refresh-btn {
		display: inline-block;
		margin-top: 1rem;
		margin-left: auto;
		padding: 0.75rem 1.5rem;
		background: #ff6800;
		color: white;
		border: none;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover:not(:disabled) {
			background: #e55a00;
		}

		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}

		@media (max-width: 1024px) {
			padding: 0.5rem 1rem;
			font-size: 0.875rem;
		}
	}

	&__players {
		margin-top: 1.875rem;
		display: flex;
		flex-direction: column;
		gap: 0.3125rem;
	}

	&__player {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0.9375rem 1.5625rem;
		gap: 0.625rem;
		background: #f1d9bd;
		border-radius: 0.9375rem;

		color: #302d2e;

		font-weight: 600;
		font-size: 1.25rem;
		line-height: 1.625rem;

		@media (max-width: 1024px) {
			padding: 0.5rem 1rem;
			gap: 0.625rem;

			background: #f1d9bd;
			border-radius: 0.9375rem;
			font-size: 0.875rem;
		}
	}

	&__loading,
	&__error,
	&__empty {
		text-align: center;
		padding: 2rem;
		font-size: 1.125rem;
		color: #f1d9bd;
	}

	&__error {
		color: #ff6800;
	}

	&__empty {
		color: #f1d9bd;
		opacity: 0.8;
	}
}
</style>
