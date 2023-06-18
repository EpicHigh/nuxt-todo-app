import { createPinia } from 'pinia';
import useErrorStore from '~/store/error';
import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { GENERIC_ERROR } from '~/constants';

describe('error store', () => {
  it('sets error message from AxiosError', () => {
    const pinia = createPinia();
    const errorStore = useErrorStore(pinia);

    const response: AxiosResponse = {
      status: 500,
      statusText: 'Internal Server Error',
      data: { message: 'Test error message' },
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    };

    const error = new AxiosError(
      'Error message',
      'Error code 500 (Internal Server Error)',
      undefined,
      undefined,
      response
    );

    errorStore.setError(error);

    expect(errorStore.message).toBe('Test error message');
  });

  it('sets error message from Error', () => {
    const pinia = createPinia();
    const errorStore = useErrorStore(pinia);

    const error = new Error('Test error message');

    errorStore.setError(error);

    expect(errorStore.message).toBe('Test error message');
  });

  it('sets generic error message if error type is unknown', () => {
    const pinia = createPinia();
    const errorStore = useErrorStore(pinia);

    errorStore.setError('Test error');

    expect(errorStore.message).toBe(GENERIC_ERROR);
  });

  it('clears the error', () => {
    const pinia = createPinia();
    const errorStore = useErrorStore(pinia);

    errorStore.setError(new Error('Test error message'));
    errorStore.clearError();

    expect(errorStore.message).toBe('');
  });
});
