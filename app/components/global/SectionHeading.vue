<template>
	<h2 class="section-heading">
		<slot />
	</h2>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.section-heading {
	font-family: 'TT Norms Pro Expanded';
	font-weight: 700;
	font-size: 1.5625rem;
	line-height: 2rem;
	color: #302d2e;

	@media (max-width: 1024px) {
		font-family: 'TT Norms Pro Expanded';
		font-style: normal;
		font-weight: 700;
		font-size: 0.9375rem;
		line-height: 1.1875rem;

		color: #302d2e;
	}
}
</style>
