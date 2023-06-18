<template>
  <div class="container">
    <div v-if="tasksByPriority.length > 0" class="add-task-container">
      <TaskButton @click="showTaskDialog">+ Add a task</TaskButton>
    </div>
    <TaskList
      v-if="tasksByPriority.length > 0"
      :tasks="tasksByPriority"
      @edit="editTask"
      @delete="deleteTask"
    />
    <EmptyState v-else class="empty-state" @click="showTaskDialog">
      + Add a task
    </EmptyState>
    <CommonDialog
      v-if="taskDialog"
      @close="hideTaskDialog"
      @keydown.esc="hideTaskDialog"
    >
      <TaskForm
        v-model:name="taskForm.name"
        v-model:description="taskForm.description"
        v-model:priority.number="taskForm.priority"
        @submit="submitTask"
      />
    </CommonDialog>
  </div>
</template>
<script setup lang="ts">
import useTaskStore, { Task } from '~/store/task';
import { storeToRefs } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

const taskDialog = useState('show-add-task-dialog', () => false);
const { tasksByPriority } = storeToRefs(useTaskStore());
const { addTask, fetchTasks, updateTask, deleteTask } = useTaskStore();
const taskForm = useState('task-form', () => ({
  name: '',
  description: '',
  priority: 0,
  id: '',
}));

await fetchTasks();

function showTaskDialog() {
  taskDialog.value = true;
}

function hideTaskDialog() {
  taskDialog.value = false;
}

function editTask(task: Task) {
  taskForm.value = task;
  showTaskDialog();
}

function submitTask() {
  if (taskForm.value.id) {
    updateTask(taskForm.value);
    hideTaskDialog();
  } else {
    addTask({
      ...taskForm.value,
      id: uuidv4(),
    });
    hideTaskDialog();
  }
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
