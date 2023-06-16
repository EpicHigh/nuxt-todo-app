import { defineStore } from 'pinia';

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
    addTask(task: Task) {
      this.tasks.push(task);
      // TODO: Add code to save task in API
    },

    updateTask(task: Task) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index > -1) {
        this.tasks[index] = task;
        // TODO: Add code to update task in API
      }
    },

    deleteTask(taskId: string) {
      const index = this.tasks.findIndex((t) => t.id === taskId);
      if (index > -1) {
        this.tasks.splice(index, 1);
        // TODO: Add code to delete task in API
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
