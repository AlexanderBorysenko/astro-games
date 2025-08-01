<template>
	<div class="astro-points-count">
		<span class="astro-points-count__label">Astro Points</span>
		<span class="astro-points-count__count">
			{{ formatPoints(user?.points_count || 0) }}
			<SvgIcon name="point" class="astro-points-count__icon" />
		</span>
	</div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const { formatPoints } = usePointsFormatter();
</script>

<style scoped lang="scss">
.astro-points-count {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 1.25rem;
	line-height: 1.625rem;
	font-weight: 500;

	@media (max-width: 1024px) {
		font-size: 0.875rem;
		line-height: 1.125rem;
	}

	&__label {
		color: #fff;
	}

	&__count {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		font-weight: 600;
		text-align: right;

		color: #ff6800;
	}

	&__icon {
		width: 1.25rem;
		height: 1.25rem;
	}
}
</style>
