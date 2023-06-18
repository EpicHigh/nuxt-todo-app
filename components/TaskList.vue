<template>
  <div>
    <ul
      v-for="{ name, description, priority, id } in props.tasks"
      :key="id"
      class="task-list"
    >
      <TaskItem :name="name" :description="description" :priority="priority" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Task } from '~/store/task';

interface Props {
  tasks: Task[];
}

const props = withDefaults(defineProps<Props>(), {
  tasks: () => [],
});
</script>

<style scoped lang="css">
.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
