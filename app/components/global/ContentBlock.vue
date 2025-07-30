<template>
	<div class="content-block">
		<div class="content-block__main">
			<slot />
		</div>
		<div v-if="image" class="content-block__image-wrapper">
			<img :src="image" />
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	image?: string;
}>();
</script>

<style lang="scss">
.content-block {
	background: linear-gradient(0deg, #302d2e, #302d2e), #f0f0f0;
	border-radius: 3.125rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	gap: 2rem;

	color: #f1d9bd;

	@media (max-width: 1024px) {
		border-radius: 1.5625rem;
		flex-direction: column;
		gap: 0;
	}

	&__main {
		flex: 35.75rem 0 0;
		padding: 3.125rem;

		font-family: 'TT Norms Pro';
		font-weight: 500;
		font-size: 1.5625rem;
		line-height: 2rem;

		*:not([class]):not(:first-child) {
			margin-top: 1em;
		}

		ol {
			list-style-type: decimal;
			margin-left: 1.5em;
			padding-left: 0;
		}

		@media (max-width: 1024px) {
			font-weight: 500;
			font-size: 0.875rem;
			line-height: 1.125rem;
			padding: 1.25rem;
			flex: 1;
		}

		:deep(h2) {
			font-family: 'TT Norms Pro Expanded';
			font-weight: 700;
			font-size: 2.5rem;
			line-height: 3.1875rem;

			@media (max-width: 1024px) {
				font-size: 1.25rem;
				line-height: 1.625rem;
			}
		}
	}

	&__image-wrapper {
		flex: 1;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		@media (max-width: 1024px) {
			padding: 1.25rem;
		}
	}
}
</style>
