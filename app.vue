<template>
  <div class="app">
    <div class="app-header">
      <h1>Task Manager</h1>
    </div>
    <div class="app-content">
      <div class="container">
        <TaskList v-if="tasks.length > 0" :tasks="tasks" />
        <EmptyState
          v-else
          class="empty-state"
          @click="showAddTaskDialog = true"
        >
          + Add a task
        </EmptyState>
        <CommonDialog
          v-if="showAddTaskDialog"
          @close="showAddTaskDialog = false"
          @keydown.esc="showAddTaskDialog = false"
        >
          <TaskForm />
        </CommonDialog>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useTaskStore from '~/store/task';
import TaskList from '~/components/containers/TaskList.vue';
import EmptyState from '~/components/common/EmptyState.vue';
import CommonDialog from '~/components/common/CommonDialog.vue';
import TaskForm from '~/components/containers/TaskForm.vue';

const taskStore = useTaskStore();
const showAddTaskDialog = useState('show-dialog', () => false);

await taskStore.fetchTasks();
const { tasks } = taskStore;

useHead({
  title: 'Task Manager',
  meta: [
    {
      name: 'description',
      content: 'A simple task manager app built with Vue 3 and Vite',
    },
    {
      name: 'charset',
      content: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Poppins',
    },
    {
      rel: 'stylesheet',
      href: 'https://meyerweb.com/eric/tools/css/reset/reset.css',
    },
  ],
});
</script>
<style lang="css">
html {
  font-size: 10px;
}

body {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #2b6cb0;
  color: #fff;
  padding: 2rem;
  text-align: center;
}

.app-content {
  flex: 1;
  padding: 2rem;
}

.empty-state {
  width: 100%;
  height: 30vh;
}
</style>
