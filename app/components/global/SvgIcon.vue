<template>
	<svg>
		<use :xlink:href="`/images/icons.svg#${name}`" />
	</svg>
</template>

<script lang="ts" setup>
defineProps<{
	name: string;
}>();
</script>

<style></style>