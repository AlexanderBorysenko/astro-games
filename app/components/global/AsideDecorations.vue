<template>
	<div class="aside-decorations">
		<div class="decoration-left"></div>
		<div class="decoration-right"></div>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.aside-decorations {
	height: 100%;
	position: fixed;
	overflow: hidden;
	top: 0;
	left: 0;
	width: 100%;
	pointer-events: none;
	@media (max-width: 1024px) {
		display: none;
	}
}
.decoration-left {
	position: absolute;
	height: 200vh;
	left: 0;
	top: 0;
	width: 17.3125rem;
	background-image: url('/images/background-decoration.png');
	background-repeat: repeat;
	background-size: contain;
	opacity: 0.4;
	animation: move-up 14s ease infinite alternate;
}
.decoration-right {
	position: absolute;
	height: 200vh;
	right: 0;
	top: -50vh;
	width: 17.3125rem;
	transform: rotateY(180deg);
	background-image: url('/images/background-decoration.png');
	background-repeat: repeat;
	background-size: contain;
	opacity: 0.4;
	animation: move-down 14s ease infinite alternate;
}

@keyframes move-up {
	0% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(-30vh);
	}
}
@keyframes move-down {
	0% {
		transform: translateY(0) rotateY(180deg);
	}
	100% {
		transform: translateY(30vh) rotateY(180deg);
	}
}
</style>
