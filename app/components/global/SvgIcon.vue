<template>
	<svg>
		<use :xlink:href="`/images/icons.svg?version=2#${name}`" />
	</svg>
</template>

<script lang="ts" setup>
defineProps<{
	name: string;
}>();
</script>

<style></style>
