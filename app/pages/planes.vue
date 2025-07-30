<template>
	<MainLayout>
		<div id="game" class="game-container">
			<canvas id="unity-canvas"></canvas>
			<div id="unity-loading-bar" v-show="isLoading">
				<div
					id="unity-progress-bar"
					:style="{ width: progress + '%' }"
				></div>
			</div>
		</div>
		<ContentBlock class="game-content" v-if="!user">
			<h2 class="mb-1-25">
				Please connect your wallet to play earn Astro Points!
			</h2>
			<ClientOnly>
				<AppWalletButton class="app-wallet-button" />
			</ClientOnly>
		</ContentBlock>
	</MainLayout>
</template>

<script setup lang="ts">
import AppWalletButton from '~/components/global/AppWalletButton.vue';
import ContentBlock from '~/components/global/ContentBlock.vue';
import MainLayout from '~/layouts/MainLayout.vue';

const isLoading = ref(true);
const progress = ref(0);
const { updatePlayerScore } = useScore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

useHead({
	title: 'Astro Games - Planes Game',
	meta: [
		{
			name: 'description',
			content:
				'Explore the Planes game on Astro Games - a thrilling Web3 experience with unique gameplay and rewards.'
		}
	]
});

onMounted(() => {
	initializeUnityGame();
	if (window) {
		//@ts-ignore
		window.updateScore = async (score: number) => {
			console.log('Score updated:', score);

			try {
				const result = await updatePlayerScore(score);

				if (result.success) {
					console.log('Score update successful:', {
						pointsAdded: result.pointsAdded,
						scoreImproved: result.scoreImproved,
						newBestScore: result.newBestScore,
						newPointsTotal: result.newPointsTotal
					});

					// Optionally show a notification to the user
					if (result.scoreImproved && result.pointsAdded > 0) {
						console.log(
							`New best score! +${result.pointsAdded} points_count earned!`
						);
					}
				} else {
					console.error('Score update failed:', result.error);
				}
			} catch (error) {
				console.error('Error updating score:', error);
			}
		};
	}
});

function initializeUnityGame() {
	const maxPixelRatioMobile = 2.0;
	const maxPixelRatioDesktop = 1.5;

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	const maxDevicePixelRatio = isMobile
		? maxPixelRatioMobile
		: maxPixelRatioDesktop;
	const pixelRatio = Math.min(window.devicePixelRatio, maxDevicePixelRatio);

	const buildUrl = '/game/Build';
	const loaderUrl = buildUrl + '/planeys-web-build.loader.js';
	const config = {
		dataUrl: buildUrl + '/planeys-web-build.data',
		frameworkUrl: buildUrl + '/planeys-web-build.framework.js',
		codeUrl: buildUrl + '/planeys-web-build.wasm',
		streamingAssetsUrl: 'StreamingAssets',
		companyName: 'AstroGames',
		productName: 'Planeys',
		productVersion: '1.0',
		devicePixelRatio: pixelRatio
	};

	const canvas = document.querySelector('#unity-canvas');

	// Dynamically load the Unity loader script
	const script = document.createElement('script');
	script.src = loaderUrl;
	script.onload = function () {
		// @ts-ignore - Unity loader is loaded dynamically
		createUnityInstance(canvas, config, function (progressValue: number) {
			progress.value = progressValue * 100;
		})
			.then(function (unityInstance: any) {
				isLoading.value = false;
				setTimeout(() => {
					canvas?.addEventListener(
						'click',
						() => {
							console.log('Canvas clicked');
							window.addEventListener(
								'scoreChange',
								function (e) {
									console.log('Score changed:', e);
								}
							);
						},
						{ once: true }
					);
				}, 3000);
			})
			.catch(function (message: string) {
				console.error('Unity game failed to load:', message);
				alert(message);
			});
	};
	script.onerror = function () {
		console.error('Failed to load Unity loader script');
		alert(
			'Failed to load game. Please check if the game files are available.'
		);
	};
	document.body.appendChild(script);
}
</script>

<style lang="scss" scoped>
.game-container {
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 9; // Maintain a 16:9 aspect ratio
	overflow: hidden;

	margin-bottom: 2rem;

	@media (max-width: 1024px) {
		aspect-ratio: 4 / 3; // Adjust aspect ratio for smaller screens
	}
}

#unity-canvas {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}

#unity-loading-bar {
	position: absolute;
	left: 30%;
	top: 50%;
	width: 40%;
	height: 10px;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 10px;
	transform: translateY(-50%);
}

#unity-progress-bar {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	background-color: #ccc;
	border-radius: 10px;
	transition: width 400ms linear;
}

.app-wallet-button {
	--background: #ff6800;
	--color: #f1d9bd;
}
</style>
