<template>
	<MainLayout>
		<PageTitle class="mb-1-25"> Conversion </PageTitle>
		<ContentBlock image="/images/convert-hero-image.png">
			<h2>Conversion</h2>
			<p>
				In the future, you’ll be able to exchange your earned Astro
				Points for $AST tokens. Stay tuned for the upcoming conversion
				feature and elevate your gaming rewards!
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
