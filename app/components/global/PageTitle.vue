<template>
	<h1 class="page-title">
		<NuxtLink to="/" class="page-title__inner">
			<svg
				width="14"
				height="24"
				viewBox="0 0 14 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 2L2.70711 11.2929C2.31658 11.6834 2.31658 12.3166 2.70711 12.7071L12 22"
					stroke="#302D2E"
					stroke-width="3"
					stroke-linecap="round"
				/>
			</svg>

			<slot></slot>
		</NuxtLink>
	</h1>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.page-title {
	font-family: 'TT Norms Pro Expanded';
	font-style: normal;
	font-weight: 700;
	font-size: 1.5625rem;
	line-height: 2rem;
	color: #302d2e;

	svg {
		display: none;
		width: 0.625rem;
		height: 1.25rem;
	}

	&__inner {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}

	@media (max-width: 1024px) {
		font-weight: 700;
		font-size: 0.9375rem;
		line-height: 1.1875rem;

		svg {
			display: block;
		}
	}
}
</style>
