<script setup lang="ts">
interface Props {
  priority: number;
}

withDefaults(defineProps<Props>(), {
  priority: 0,
});

function getPriorityContent(priority: number) {
  switch (priority) {
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    default:
      return 'Unknown';
  }
}
</script>

<template>
  <span
    class="priority"
    :class="{
      'high-priority': priority === 3,
      'medium-priority': priority === 2,
      'low-priority': priority === 1,
      'unknown-priority': priority > 3 || priority < 1,
    }"
  >
    {{ getPriorityContent(priority) }}
  </span>
</template>

<style scoped lang="css">
.high-priority {
  color: rgb(155 28 28);
  background-color: rgb(254 226 226);
}

.medium-priority {
  color: rgb(251 191 36);
  background-color: rgb(254 243 199);
}

.low-priority {
  color: rgb(16 185 129);
  background-color: rgb(209 250 229);
}

.unknown-priority {
  color: rgb(107 114 128);
  background-color: rgb(229 231 235);
}

.priority {
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  text-align: center;
}
</style>
