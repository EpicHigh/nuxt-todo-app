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
      <input v-model="task.priority" type="number" />
    </label>
    <TaskButton type="submit">Submit</TaskButton>
  </form>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import TaskButton from '~/components/common/TaskButton.vue';
import useTaskStore from '~/store/store';

const store = useTaskStore();
const task = useState('task-form', () => ({
  name: '',
  description: '',
  priority: 0,
}));

const submitForm = () => {
  store.addTask({ id: uuidv4(), ...task.value });
  task.value = { name: '', description: '', priority: 0 };
};
</script>

<style scoped lang="css">
.task-form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 500px;
  margin: auto;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

  & input {
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
    padding: 48px;
  }
}
</style>
