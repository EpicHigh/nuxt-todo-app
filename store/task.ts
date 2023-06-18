import { defineStore } from 'pinia';
import useErrorStore from '~/store/error';
import { BASE_URL, GENERIC_ERROR } from '~/constants';

interface Task {
  id: string;
  name: string;
  description: string;
  priority: number;
}

interface State {
  tasks: Task[];
  currentTask: Task | null;
}

const useTaskStore = defineStore('task', {
  state: (): State => ({
    tasks: [],
    currentTask: null,
  }),

  actions: {
    async fetchTasks() {
      const errorStore = useErrorStore();
      const { data, error } = await useFetch<Task[]>(BASE_URL);
      if (error) {
        errorStore.setError(error.value?.message || GENERIC_ERROR);
      } else {
        this.tasks = data.value || [];
      }
    },

    async addTask(task: Task) {
      this.tasks.push(task);
      const errorStore = useErrorStore();
      const { error } = await useFetch<Task[]>(BASE_URL, {
        method: 'POST',
      });
      if (error) {
        errorStore.setError(error.value?.message || GENERIC_ERROR);
      }
    },

    async updateTask(task: Task) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index > -1) {
        this.tasks[index] = task;
        const errorStore = useErrorStore();
        const { error } = await useFetch<Task[]>(`${BASE_URL}/${index}`, {
          method: 'PUT',
        });
        if (error) {
          errorStore.setError(error.value?.message || GENERIC_ERROR);
        }
      }
    },

    async deleteTask(taskId: string) {
      const index = this.tasks.findIndex((t) => t.id === taskId);
      if (index > -1) {
        this.tasks.splice(index, 1);
        const errorStore = useErrorStore();
        const { error } = await useFetch<Task[]>(`${BASE_URL}/${index}`, {
          method: 'DELETE',
        });
        if (error) {
          errorStore.setError(error.value?.message || GENERIC_ERROR);
        }
      }
    },

    setCurrentTask(task: Task | null) {
      this.currentTask = task;
    },

    clearCurrentTask() {
      this.currentTask = null;
    },
  },
});

export default useTaskStore;
