import { defineStore } from 'pinia';
import useErrorStore from '~/store/error';
import { TASKS_ENDPOINT } from '~/constants';
import axios from '~/services';

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
      try {
        const { data } = await axios.get<Task[]>(TASKS_ENDPOINT);
        this.tasks = data || [];
      } catch (error: unknown) {
        errorStore.setError(error);
      }
    },

    async addTask(task: Task) {
      const errorStore = useErrorStore();
      this.tasks.push(task);
      try {
        await axios.post<Task[]>(TASKS_ENDPOINT, task);
      } catch (error: unknown) {
        errorStore.setError(error);
      }
    },

    async updateTask(task: Task) {
      const errorStore = useErrorStore();
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index > -1) {
        try {
          await axios.put<Task>(`${TASKS_ENDPOINT}/${task.id}`, task);
          this.tasks[index] = task;
        } catch (error: unknown) {
          errorStore.setError(error);
        }
      }
    },

    async deleteTask(taskId: string) {
      const errorStore = useErrorStore();
      const index = this.tasks.findIndex((t) => t.id === taskId);
      if (index > -1) {
        try {
          await axios.delete<Task>(`${TASKS_ENDPOINT}/${taskId}`);
          this.tasks.splice(index, 1);
        } catch (error: unknown) {
          errorStore.setError(error);
        }
      }
    },
  },
});

export default useTaskStore;
