<template>
	<NuxtLayout>
		<AsideDecorations />
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts"></script>

<style lang="scss" global>
html {
	max-width: 100vw;
	font-size: 0.83333vw;

	scroll-behavior: smooth;

	background: #f1d9bd;

	@media (max-width: 1024px) {
		font-size: 5vw;
	}
}
body > div {
	overflow: hidden;
}
</style>
