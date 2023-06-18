<template>
  <div>
    <div v-for="{ name, description, priority, id } in tasks" :key="id">
      <TaskItem :name="name" :description="description" :priority="priority" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskItem from '~/components/common/TaskItem.vue';
import useTaskStore from '~/store/task';
import { storeToRefs } from 'pinia';

const { tasks } = storeToRefs(useTaskStore());
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
