<template>
  <form class="task-form" @submit.prevent="submitForm">
    <label
      >Task Name:
      <input v-model="task.name" required type="text" />
    </label>
    <label
      >Description:
      <input v-model="task.description" type="text" />
    </label>
    <label
      >Priority Level:
      <select v-model="task.priority" required class="arrow-select">
        <option :value="1">Low</option>
        <option :value="2">Medium</option>
        <option :value="3">High</option>
      </select>
    </label>
    <TaskButton class="button" type="submit">Submit</TaskButton>
  </form>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

const emits = defineEmits(['submit']);

const task = useState('task-form', () => ({
  name: '',
  description: '',
  priority: 0,
}));

function submitForm() {
  emits('submit', { id: uuidv4(), ...task.value });
  task.value = { name: '', description: '', priority: 0 };
}
</script>

<style scoped lang="css">
.task-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: auto;
  border-radius: 4px;
  width: 100%;

  & label {
    letter-spacing: 0;
    line-height: 18px;
    white-space: pre-line;
    opacity: 1;
    visibility: visible;
    color: rgb(30, 31, 38);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & input,
  select {
    background-color: rgba(251, 251, 251, 0.74);
    border-radius: 12px;
    border: 1px solid rgb(206, 206, 211);
    height: 40px;
    padding: 0 8px;
    color: rgb(25, 25, 27);
    font-size: 16px;
    letter-spacing: 0;
    text-align: left;
    text-transform: none;
  }

  @media (min-width: 768px) {
    width: 320px;
  }

  @media (min-width: 1024px) {
    width: 400px;
  }
}

.button {
  margin-top: 1.2rem;
}
</style>
