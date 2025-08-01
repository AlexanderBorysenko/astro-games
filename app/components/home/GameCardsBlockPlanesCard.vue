<template>
	<div class="game-card-block-planes-card">
		<div class="game-card-block-planes-card__content">
			<img
				src="~/assets/images/planes-game-card-content-decoration.svg"
				alt=""
				class="game-card-block-planes-card__content-decoration"
			/>
			<h3 class="game-card-block-planes-card__title">Planes</h3>
			<p class="game-card-block-planes-card__promo-bar">X2 Rewards</p>
		</div>
		<div class="game-card-block-planes-card__image">
			<img
				src="~/assets/images/planes-game-card-image.png"
				alt="Planes Game Card"
			/>
		</div>
		<div class="game-card-block-planes-card__plane _2">
			<img src="~/assets/images/plane.png" class="" alt="" />
		</div>
		<div class="game-card-block-planes-card__plane _1">
			<img src="~/assets/images/plane.png" class="" alt="" />
		</div>
		<NuxtLink class="game-card-block-planes-card__button" to="/planes">
			Play now
		</NuxtLink>
		<img
			class="game-card-block-planes-card__side-decoration"
			src="~/assets/images/planes-card-side-decoration.svg"
			alt=""
		/>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.game-card-block-planes-card {
	position: relative;
	z-index: 2;
	min-height: 16.875rem;
	@media (max-width: 1024px) {
		min-height: 8.125rem;
	}
	&__content {
		display: flex;
		justify-content: center;
		flex-direction: column;
		position: relative;
		padding: 2.5rem;
		z-index: 2;
		height: 100%;

		@media (max-width: 1024px) {
			padding: 2rem 1rem;
		}
	}

	&__content-decoration {
		position: absolute;
		left: -2.0625rem;
		z-index: -1;
		height: calc(100% + 0.8rem);
		@media (max-width: 1024px) {
			left: -0.9rem;
			height: calc(100% + 0.4rem);
		}
	}

	&__title {
		font-family: 'TT Norms Pro Expanded';
		font-style: normal;
		font-weight: 700;
		font-size: 3.125rem;
		line-height: 4rem;
		color: #f1d9bd;
		@media (max-width: 1024px) {
			font-weight: 700;
			font-size: 1.25rem;
			line-height: 1.625rem;
		}
	}

	&__promo-bar {
		margin-top: 1rem;
		padding: 0.625rem 0.9375rem;
		border: 0.125rem solid #f1d9bd;
		border-radius: 5.625rem;
		width: fit-content;
		font-family: 'TT Norms Pro';
		font-weight: 600;
		font-size: 1.4375rem;
		line-height: 1;
		color: #f1d9bd;

		@media (max-width: 1024px) {
			padding: 0.3125rem 0.5rem;
			border: 0.0604rem solid #f1d9bd;
			border-radius: 2.7187rem;
			font-weight: 600;
			font-size: 0.75rem;
			line-height: 0.9375rem;
			margin-top: 0.75rem;
		}
	}

	&__image {
		border-radius: 0 3.125rem 3.125rem 0;
		overflow: hidden;
		width: 100%;
		position: absolute;
		inset: 0;
		z-index: -1;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		@media (max-width: 1024px) {
			border-radius: 0 1.5625rem 1.5625rem 0;
		}
	}

	&__plane {
		position: absolute;
		img {
			width: 100%;
			height: 100%;
			animation: plane-horizontal-move 7s ease-in-out infinite alternate;
		}
		&._1 {
			position: absolute;
			width: 8.0944rem;
			height: 11.8306rem;
			right: 2rem;
			top: -1.25rem;

			filter: drop-shadow(
				0.5625rem 1.375rem 1.2188rem rgba(0, 0, 0, 0.26)
			);
			transform: rotate(-135deg);

			@media (max-width: 1024px) {
				position: absolute;
				width: 3.9125rem;
				height: 5.7181rem;
				right: 0;
				top: 0;
				filter: drop-shadow(
					0.2719rem 0.6646rem 0.589rem rgba(0, 0, 0, 0.26)
				);
				transform: rotate(-135deg);
			}
		}
		&._2 {
			position: absolute;
			width: 2.9712rem;
			height: 4.3425rem;
			left: 16.79rem;
			top: 2.875rem;
			filter: drop-shadow(
				0.2065rem 0.5047rem 0.4474rem rgba(0, 0, 0, 0.26)
			);
			transform: rotate(-45deg);
			@media (max-width: 1024px) {
				position: absolute;
				width: 1.4363rem;
				height: 2.0987rem;
				left: 8.1181rem;
				top: 1.3606rem;

				filter: drop-shadow(
					0.0998rem 0.2439rem 0.2162rem rgba(0, 0, 0, 0.26)
				);
				transform: rotate(-45deg);
			}
		}
	}

	&__button {
		position: absolute;
		bottom: 2rem;
		right: 2rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 1.25rem 1.875rem;

		background: #ffffff;
		border-radius: 0.9375rem;
		width: fit-content;
		font-weight: 600;
		font-size: 1.4375rem;
		line-height: 1.8125rem;
		color: #302d2e;

		transition: background-color 0.3s ease, color 0.3s ease;

		z-index: 2;
		&:hover {
			background: #ff6800;
			color: #ffffff;
			box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		}

		@media (max-width: 1024px) {
			padding: 0.6041rem 0.9062rem;
			border-radius: 0.4531rem;
			font-weight: 600;
			font-size: 0.8125rem;
			line-height: 1.0625rem;
			bottom: 0.875rem;
			right: 0.875rem;
		}
	}

	&__side-decoration {
		position: absolute;
		width: 6.1087rem;
		height: 6.1087rem;
		left: 32.5rem;
		top: -4.375rem;
		@media (max-width: 1024px) {
			display: none;
		}
	}
}
</style>
