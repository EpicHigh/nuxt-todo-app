<template>
  <ul class="task-list">
    <TaskItem
      v-for="{ name, description, priority, id } in tasks"
      :key="id"
      :name="name"
      :description="description"
      :priority="priority"
      @edit="$emit('edit', { name, description, priority, id })"
      @delete="$emit('delete', id)"
    />
  </ul>
</template>

<script setup lang="ts">
import { Task } from '~/store/task';

interface Props {
  tasks: Task[];
}

withDefaults(defineProps<Props>(), {
  tasks: () => [],
});
defineEmits(['edit', 'delete']);
</script>

<style scoped lang="css">
.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
