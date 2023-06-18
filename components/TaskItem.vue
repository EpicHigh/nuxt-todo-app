<script setup lang="ts">
import { Task } from '~/store/task';

type Props = Omit<Task, 'id'>;

withDefaults(defineProps<Props>(), {
  name: '',
  description: '',
  priority: 0,
});

defineEmits(['edit', 'delete']);
</script>

<template>
  <li class="list">
    <div>
      <div class="task-title">
        <p class="task-name">{{ name }}</p>
        <TaskBadge :priority="priority" />
      </div>
      <div class="task-description">
        <p>{{ description }}</p>
      </div>
    </div>
    <div class="task-action">
      <TaskButton data-test="edit-button" @click="$emit('edit')"
        >Edit
      </TaskButton>
      <TaskButton data-test="delete-button" @click="$emit('delete')"
        >Delete
      </TaskButton>
    </div>
  </li>
</template>

<style scoped lang="css">
.list {
  padding: 1.6rem 0;
  column-gap: 1.6rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 1.6rem;
    align-items: flex-start;
  }
}

.task-title {
  column-gap: 0.75rem;
  display: flex;
  align-items: flex-start;
}

.task-action {
  column-gap: 0.75rem;
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    row-gap: 0.75rem;
  }

  & > button {
    height: 3.2rem;

    @media (min-width: 768px) {
      padding: 0.8rem 1.6rem;
      height: 4.8rem;
    }
  }
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
