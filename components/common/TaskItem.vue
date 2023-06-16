<script setup lang="ts">
interface Props {
  name: string;
  description: string;
  priority: number;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  description: '',
  priority: 0,
});
</script>

<template>
  <div>
    <h2>{{ props.name }}</h2>
    <p>{{ props.description }}</p>
    <p>Priority: {{ props.priority }}</p>
  </div>
</template>

<style scoped lang="css">
div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;

  @media (min-width: 768px) {
    width: 256px;
  }
}

h2 {
  font-size: 1.2em;
  color: #333;
}

p {
  color: #555;
}

p:last-of-type {
  font-weight: bold;
}
</style>
