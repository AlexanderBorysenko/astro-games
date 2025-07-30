<template>
	<MainLayout>
		<PageTitle class="mb-1-25"> Airdrop </PageTitle>
		<ContentBlock image="/images/airdrop-hero-image.png">
			<h2>Airdrop</h2>
			<p>
				An airdrop is on the horizon, and we’ll be sharing full details
				soon. Stay tuned for your chance to grab some $AST rewards!
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
