<template>
  <form class="task-form" @submit.prevent="emits('submit')">
    <label
      >Task Name:
      <input
        :value="name"
        required
        type="text"
        @input="emits('update:name', $event.target.value)"
      />
    </label>
    <label
      >Description:
      <input
        :value="description"
        type="text"
        @input="emits('update:description', $event.target.value)"
      />
    </label>
    <label
      >Priority Level:
      <select
        :value="priority"
        required
        class="arrow-select"
        @input="emits('update:priority', $event.target.value)"
      >
        <option :value="1">Low</option>
        <option :value="2">Medium</option>
        <option :value="3">High</option>
      </select>
    </label>
    <TaskButton class="button" type="submit">Submit</TaskButton>
  </form>
</template>

<script setup lang="ts">
import { Task } from '~/store/task';

type Props = Omit<Task, 'id'>;

const emits = defineEmits([
  'submit',
  'update:description',
  'update:priority',
  'update:name',
]);
withDefaults(defineProps<Props>(), {
  name: '',
  description: '',
  priority: 0,
});
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
