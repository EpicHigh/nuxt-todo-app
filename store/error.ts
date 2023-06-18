import { defineStore } from 'pinia';

interface Error {
  message: string;
}

const useErrorStore = defineStore('error', {
  state: (): Error => ({
    message: '',
  }),

  actions: {
    setError(message: string) {
      this.message = message;
    },
    clearError() {
      this.message = '';
    },
  },
});

export default useErrorStore;
