<template>
  <ul class="task-list">
    <TaskItem
      v-for="{ name, description, priority, id } in props.tasks"
      :key="id"
      :name="name"
      :description="description"
      :priority="priority"
      @edit="() => editTask({ name, description, priority, id })"
      @delete="() => deleteTask(id)"
    />
  </ul>
</template>

<script setup lang="ts">
import { Task } from '~/store/task';

interface Props {
  tasks: Task[];
}

const props = withDefaults(defineProps<Props>(), {
  tasks: () => [],
});
const emit = defineEmits(['edit', 'delete']);

function editTask(task: Task) {
  emit('edit', task);
}

function deleteTask(id: string) {
  emit('delete', id);
}
</script>

<style scoped lang="css">
.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
