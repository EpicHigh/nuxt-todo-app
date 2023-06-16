<template>
  <div>
    <div v-for="{ name, description, priority } in tasks" :key="name">
      <TaskItem :name="name" :description="description" :priority="priority" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskItem from '~/components/common/TaskItem.vue';

const tasks = [
  {
    name: 'Task 1',
    description: 'This is the first task',
    priority: 1,
  },
  {
    name: 'Task 2',
    description: 'This is the second task',
    priority: 2,
  },
  {
    name: 'Task 3',
    description: 'This is the third task',
    priority: 3,
  },
];
</script>

<style scoped lang="css">
div {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 8px;
}
</style>
