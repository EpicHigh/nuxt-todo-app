<template>
  <div class="container">
    <div v-if="tasks.length > 0" class="add-task-container">
      <TaskButton @click="showAddTaskDialog">+ Add a task</TaskButton>
    </div>
    <TaskList
      v-if="tasks.length > 0"
      :tasks="tasks"
      @edit="updateTask"
      @delete="deleteTask"
    />
    <EmptyState v-else class="empty-state" @click="showAddTaskDialog">
      + Add a task
    </EmptyState>
    <CommonDialog
      v-if="addTaskDialog"
      @close="hideAddTaskDialog"
      @keydown.esc="hideAddTaskDialog"
    >
      <TaskForm @submit="submitTask" />
    </CommonDialog>
  </div>
</template>
<script setup lang="ts">
import useTaskStore, { Task } from '~/store/task';
import { storeToRefs } from 'pinia';

const addTaskDialog = useState('show-add-task-dialog', () => false);
const { tasks } = storeToRefs(useTaskStore());
const { addTask, fetchTasks, updateTask, deleteTask } = useTaskStore();

await fetchTasks();

function showAddTaskDialog() {
  addTaskDialog.value = true;
}

function hideAddTaskDialog() {
  addTaskDialog.value = false;
}

function submitTask(task: Task) {
  addTask(task);
  hideAddTaskDialog();
}

definePageMeta({
  layout: 'default',
});
</script>
<style lang="css">
.empty-state {
  width: 100%;
  height: 30vh;
}

.add-task-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2.4rem;

  & > button {
    padding: 0.5rem 1rem;
  }
}
</style>
