import { defineStore } from 'pinia';
import useErrorStore from '~/store/error';
import { BASE_URL, GENERIC_ERROR } from '~/constants';

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: number;
}

interface State {
  tasks: Task[];
}

const useTaskStore = defineStore('task', {
  state: (): State => ({
    tasks: [],
  }),

  getters: {
    tasksByPriority(state) {
      return state.tasks.sort((a, b) => b.priority - a.priority);
    },
  },

  actions: {
    async fetchTasks() {
      const errorStore = useErrorStore();
      const { data, error } = await useFetch<Task[]>(BASE_URL);
      if (error.value) {
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
        body: JSON.stringify(task),
      });
      if (error.value) {
        errorStore.setError(error.value?.message || GENERIC_ERROR);
      }
    },

    async updateTask(task: Task) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index > -1) {
        this.tasks[index] = task;
        const errorStore = useErrorStore();
        const { error } = await useFetch<Task[]>(`${BASE_URL}/${task.id}`, {
          method: 'PUT',
          body: JSON.stringify(task),
        });
        if (error.value) {
          errorStore.setError(error.value?.message || GENERIC_ERROR);
        }
      }
    },

    async deleteTask(taskId: string) {
      const index = this.tasks.findIndex((t) => t.id === taskId);
      if (index > -1) {
        this.tasks.splice(index, 1);
        const errorStore = useErrorStore();
        const { error } = await useFetch<Task[]>(`${BASE_URL}/${taskId}`, {
          method: 'DELETE',
        });
        if (error.value) {
          errorStore.setError(error.value?.message || GENERIC_ERROR);
        }
      }
    },
  },
});

export default useTaskStore;
