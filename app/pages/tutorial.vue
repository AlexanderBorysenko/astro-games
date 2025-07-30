<template>
	<MainLayout>
		<PageTitle class="mb-1-25"> Tutorial </PageTitle>
		<ContentBlock>
			<h2>Get Started with Astro</h2>
			<ol>
				<li>
					Download the web3 wallet <strong>Phantom</strong> to your
					browser
				</li>
				<li>Connect your Phantom wallet to the Astro platform</li>
				<li>Start playing and earn <strong>$AST</strong> rewards!</li>
			</ol>
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
