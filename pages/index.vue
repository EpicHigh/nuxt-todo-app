<template>
  <div class="container">
    <TaskList v-if="tasks.length > 0" :tasks="tasks" />
    <EmptyState v-else class="empty-state" @click="showAddTaskDialog">
      + Add a task
    </EmptyState>
    <CommonDialog
      v-if="addTaskDialog"
      @close="hideAddTaskDialog"
      @keydown.esc="hideAddTaskDialog"
    >
      <TaskForm @close="hideAddTaskDialog" />
    </CommonDialog>
    <CommonDialog
      v-if="errorStore.message"
      @close="errorStore.clearError"
      @keydown.esc="errorStore.clearError"
    >
      <div class="error-container">
        <p>{{ errorStore.message }}</p>
      </div>
    </CommonDialog>
  </div>
</template>
<script setup lang="ts">
import useTaskStore from '~/store/task';
import TaskList from '~/components/containers/TaskList.vue';
import EmptyState from '~/components/common/EmptyState.vue';
import CommonDialog from '~/components/common/CommonDialog.vue';
import TaskForm from '~/components/containers/TaskForm.vue';
import useErrorStore from '~/store/error';

const taskStore = useTaskStore();
const errorStore = useErrorStore();
const addTaskDialog = useState('show-add-task-dialog', () => false);

await taskStore.fetchTasks();
const { tasks } = taskStore;

function showAddTaskDialog() {
  addTaskDialog.value = true;
}

function hideAddTaskDialog() {
  addTaskDialog.value = false;
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

.error-container {
  padding: 2rem;
}
</style>
