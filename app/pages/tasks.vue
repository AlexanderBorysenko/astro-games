<template>
	<MainLayout>
		<PageTitle class="mb-1-25"> Astro Points </PageTitle>
		<ContentBlock image="/images/tasks-hero-image.png">
			<h2 v-if="isLoading && !isInitialized">Loading tasks...</h2>
			<h2 v-else>
				{{
					stats.availablePoints > 0
						? `${stats.availablePoints} Astro points`
						: 'All tasks completed!'
				}}
			</h2>
			<ClientOnly>
				<div v-if="isLoading && !isInitialized" class="tasks__loading">
					Loading your tasks...
				</div>
				<div
					v-else
					class="tasks"
					:class="{
						_disabled: !isLoggedIn
					}"
				>
					<button
						v-for="task in tasks"
						:key="task.id"
						@click="handleTaskClick(task.id)"
						class="tasks__item"
						:class="{ _completed: isTaskCompleted(task.id) }"
						:disabled="
							!isLoggedIn || isTaskCompleted(task.id) || isLoading
						"
					>
						<span class="task__item-title">{{ task.title }}</span>
						<strong
							class="task__item-reward"
							v-if="!isTaskCompleted(task.id)"
							>{{ task.points }} Astro Points</strong
						>
						<strong v-else class="completed">✓ Completed</strong>
						<div class="tasks__item-icon-wrapper">
							<SvgIcon
								:name="task.icon"
								class="tasks__item-icon"
								width="24"
								height="24"
							/>
						</div>
					</button>
				</div>
			</ClientOnly>
			<p v-if="!isLoggedIn">
				Please Connect Wallet to complete tasks and earn Astro Points.
			</p>
		</ContentBlock>
	</MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';

const { isLoggedIn } = useAuthCheck();
const {
	tasks,
	isTaskCompleted,
	getTaskStats,
	completeTask,
	isLoading,
	isInitialized
} = useTasks();

// Task statistics
const stats = computed(() => getTaskStats());

// Handle task click
const handleTaskClick = async (taskId: 'telegram' | 'x' | 'game') => {
	try {
		const result = await completeTask(taskId);
		if (result.success) {
			// Optionally show success message
			console.log(`Task completed! Earned ${result.pointsEarned} points`);
		}
	} catch (error) {
		console.error('Failed to complete task:', error);
		// Handle error - you could show a toast notification here
	}
};

useHead({
	title: 'Astro Games - Tasks',
	meta: [
		{
			name: 'description',
			content:
				'Get Free Astro Points by completing tasks and earn rewards in the Astro Games ecosystem.'
		}
	]
});
</script>

<style lang="scss" scoped>
.tasks {
	display: flex;
	gap: 0.5rem;
	flex-direction: column;
	margin-top: 1.875rem;

	&._disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	&__item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		text-align: left;
		padding: 0.625rem 0.9375rem;
		gap: 0.625rem;
		border: none;
		cursor: pointer;

		font-weight: 500;
		font-size: 1.25rem;
		line-height: 1.625rem;

		background: #f1d9bd;
		color: #302d2e;
		border-radius: 1.25rem;

		width: 100%;

		strong {
			color: #ff6800;
			font-weight: 500;

			&.completed {
				color: #10b981; // Green color for completed
			}
		}

		transition: transform 0.3s ease, opacity 0.3s ease;

		&:hover:not(:disabled) {
			transform: scale(1.02);
		}

		&:disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}

		&._completed {
			background: #e5f7f0; // Light green background
			border: 2px solid #10b981; // Green border

			.tasks__item-icon-wrapper {
				background: #10b981; // Green icon background
				color: white;
			}
		}
	}

	&__item-icon {
		width: 1.25rem;
	}

	&__item-icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		background: #302d2e;
		color: #f1d9bd;
		border-radius: 50%;
		margin-left: auto;
		transition: background-color 0.3s ease;
	}

	&__loading {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		margin-top: 1.875rem;
		background: #f1d9bd;
		border-radius: 1.25rem;
		color: #302d2e;
		font-weight: 500;
		font-size: 1.125rem;
	}

	&__summary {
		margin-top: 1.5rem;
		padding: 1rem;
		background: #f0f9ff;
		border: 2px solid #0ea5e9;
		border-radius: 1rem;

		p {
			margin: 0.25rem 0;
			font-weight: 500;
			color: #0c4a6e;

			&:first-child {
				font-size: 1.1rem;
			}
		}
	}
}
</style>
