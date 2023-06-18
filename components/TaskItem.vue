<script setup lang="ts">
import { Task } from '~/store/task';

type Props = Omit<Task, 'id'>;

const props = withDefaults(defineProps<Props>(), {
  name: '',
  description: '',
  priority: 0,
});
</script>

<template>
  <li class="list">
    <div>
      <div class="task-title">
        <p class="task-name">{{ props.name }}</p>
        <TaskBadge :priority="props.priority" />
      </div>
      <div class="task-description">
        <p>{{ props.description }}</p>
      </div>
    </div>
  </li>
</template>

<style scoped lang="css">
.list {
  padding: 1.6rem 0;
  column-gap: 1.5rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.task-title {
  column-gap: 0.75rem;
  display: flex;
  align-items: flex-start;
}

.task-name {
  font-weight: 500;
  line-height: 1.75rem;
  font-size: 1.6rem;
}

.task-description {
  margin-top: 0.8rem;
  color: #9ca3af;
  line-height: 1.25rem;
  font-size: 1.2rem;
}
</style>
