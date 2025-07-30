<template>
	<MainLayout>
		<div class="main-content">
			<HomeSlider class="first-screen-slider" />
			<SectionHeading class="mb-1-25">Astro Games</SectionHeading>
			<HomeGameCardsBlock class="home-game-cards-block" />
			<HomeEncourageSection class="home-encourage-section" />
			<SectionHeading class="mb-1-25">How To Start</SectionHeading>
			<HomeHowToStart class="home-how-to-start" />
			<SectionHeading class="mb-1-25">About Astro</SectionHeading>
			<HomeAboutAstro class="home-about-astro" />
			<SectionHeading class="mb-1-25">FAQ</SectionHeading>
			<HomeFaq class="home-faq" id="faq" />
			<SectionHeading class="mb-1-25">Earn now</SectionHeading>
			<HomeEarnAstroPoints class="home-earn-astro-points" />
		</div>
	</MainLayout>
</template>

<script setup lang="ts">
import HomeEncourageSection from '~/components/home/HomeEncourageSection.vue';
import HomeHowToStart from '~/components/home/HomeHowToStart.vue';
import MainLayout from '~/layouts/MainLayout.vue';

useHead({
	title: 'Astro Games - Home',
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
.first-screen-slider {
	margin-bottom: 2.5rem;
	@media (max-width: 1024px) {
		margin-bottom: 1.625rem;
	}
}
.home-game-cards-block {
	margin-bottom: 4.875rem;
	@media (max-width: 1024px) {
		margin-bottom: 2.5rem;
	}
}
.home-encourage-section {
	margin-bottom: 4.75rem;
	@media (max-width: 1024px) {
		margin-bottom: 2.25rem;
	}
}
.home-how-to-start {
	margin-bottom: 3.75rem;
	@media (max-width: 1024px) {
		margin-bottom: 1.875rem;
	}
}
.home-about-astro {
	margin-bottom: 4.75rem;
	@media (max-width: 1024px) {
		margin-bottom: 2.25rem;
	}
}
.home-faq {
	margin-bottom: 3.75rem;
	@media (max-width: 1024px) {
		margin-bottom: 1.875rem;
	}
}
</style>
