<template>
	<MainLayout>
		<PageTitle class="mb-1-25"> Tutorial </PageTitle>
		<ContentBlock image="/images/games-hero-image.png">
			<h2>New games</h2>
			<p>
				We're gearing up to launch a series of thrilling new games that
				will push the boundaries of Web3 entertainment. Stay tuned for
				immersive challenges, innovative mechanics, and exclusive $AST
				rewards.
			</p>
		</ContentBlock>
	</MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';

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

<style lang="scss" scoped></style>
