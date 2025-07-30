<template>
	<div class="faq">
		<h2 class="faq__title">What is Astro?</h2>
		<p class="faq__text">
			Astro is a P2E platform where players can enjoy games and earn $AST
			rewards within a unique gaming ecosystem.
		</p>
		<div class="faq__items">
			<div
				v-for="(item, index) in faqItems"
				:key="index"
				class="faq__item"
				:class="{ 'faq__item--opened': faqOpenedItemIndex === index }"
			>
				<div
					class="faq__question"
					@click="
						faqOpenedItemIndex =
							faqOpenedItemIndex === index ? null : index
					"
				>
					{{ item.question }}
					<svg
						width="24"
						height="14"
						viewBox="0 0 24 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2 2L11.2929 11.2929C11.6834 11.6834 12.3166 11.6834 12.7071 11.2929L22 2"
							stroke="#302D2E"
							stroke-width="3"
							stroke-linecap="round"
						/>
					</svg>
				</div>
				<div v-if="faqOpenedItemIndex === index" class="faq__answer">
					{{ item.answer }}
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const faqOpenedItemIndex = ref<number | null>(0);
const faqItems = [
	{
		question: 'What is Astro?',
		answer: 'Astro is a P2E platform where players can enjoy games and earn $AST rewards within a unique gaming ecosystem.'
	},
	{
		question: 'How do I start playing?',
		answer: 'Download the Phantom web3 wallet to your browser, connect it to Astro, and begin playing.'
	},
	{
		question: 'What is $AST?',
		answer: '$AST is the in-game token used for rewards and transactions on the Astro platform.'
	},
	{
		question: 'Do I need to pay to play?',
		answer: 'Basic gameplay is free, but connecting a wallet and depositing tokens unlocks Pro Mode Games (P2E).'
	},
	{
		question: 'Where can I get support?',
		answer: 'Visit our official website or community channels for assistance.'
	}
];
</script>

<style scoped lang="scss">
.faq {
	padding: 3.125rem;
	left: 36.0625rem;
	top: 136.1875rem;
	background: linear-gradient(0deg, #302d2e, #302d2e), #f1d9bd;
	border-radius: 3.125rem;
	color: #f1d9bd;
	@media (max-width: 1024px) {
		padding: 1.25rem;
		background: linear-gradient(0deg, #302d2e, #302d2e), #f1d9bd;
		border-radius: 1.5625rem;
	}
	&__title {
		font-family: 'TT Norms Pro Expanded';
		font-weight: 700;
		font-size: 2.5rem;
		line-height: 3.1875rem;
		color: #f1d9bd;
		margin-bottom: 1rem;
		@media (max-width: 1024px) {
			font-weight: 700;
			font-size: 1.25rem;
			line-height: 1.625rem;
		}
	}

	&__text {
		font-family: 'TT Norms Pro';
		font-weight: 500;
		font-size: 1.5625rem;
		line-height: 2rem;
		color: #f1d9bd;
		opacity: 0.5;
		max-width: 45.25rem;
		@media (max-width: 1024px) {
			font-size: 0.75rem;
			line-height: 0.9375rem;
		}
	}

	&__items {
		margin-top: 1.875rem;
		display: flex;
		flex-direction: column;
		gap: 0.9375rem;
		color: #302d2e;
		@media (max-width: 1024px) {
			gap: 0.5rem;
		}
	}

	&__item {
		background: #f1d9bd;
		border-radius: 0.9375rem;
		&--opened {
			svg {
				transform: rotate(180deg);
			}
		}
	}

	&__question {
		padding: 0.9375rem 1.5625rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

		font-weight: 600;
		font-size: 1.25rem;
		line-height: 1.625rem;

		cursor: pointer;
		svg {
			width: 1.25rem;
			@media (max-width: 1024px) {
				width: 1rem;
			}
		}

		@media (max-width: 1024px) {
			padding: 0.25rem 0.9375rem;
			font-size: 0.75rem;
		}
	}

	&__answer {
		padding: 0.9375rem 1.5625rem;
		font-family: 'TT Norms Pro';
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.625rem;
		color: #302d2e;
		background-color: #ffffff;
		border-radius: 0 0 0.9375rem 0.9375rem;
		margin-top: -0.0625rem; /* To align with question border */
		@media (max-width: 1024px) {
			font-size: 0.75rem;
			line-height: 0.9375rem;
			padding: 0.9375rem;
		}
	}
}
</style>
