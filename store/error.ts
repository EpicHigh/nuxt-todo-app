import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { GENERIC_ERROR } from '~/constants';

interface Error {
  message: string;
}

const useErrorStore = defineStore('error', {
  state: (): Error => ({
    message: '',
  }),

  actions: {
    setError(error: unknown) {
      if (error instanceof AxiosError) {
        this.message = error.response?.data.message || GENERIC_ERROR;
      } else if (error instanceof Error) {
        this.message = error.message || GENERIC_ERROR;
      } else {
        this.message = GENERIC_ERROR;
      }
    },
    clearError() {
      this.message = '';
    },
  },
});

export default useErrorStore;
