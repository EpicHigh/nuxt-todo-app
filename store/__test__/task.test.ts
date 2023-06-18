import { createPinia } from 'pinia';
import axios from '~/services';
import MockAdapter from 'axios-mock-adapter';
import useTaskStore, { Task } from '~/store/task';
import { TASKS_ENDPOINT } from '~/constants';
import useErrorStore from '~/store/error';

describe('task store', () => {
  let axiosMock: MockAdapter;

  beforeAll(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('fetches tasks', async () => {
    const tasks: Task[] = [
      { id: '1', name: 'Task 1', description: 'Description 1', priority: 1 },
      { id: '2', name: 'Task 2', description: 'Description 2', priority: 2 },
    ];

    axiosMock.onGet(TASKS_ENDPOINT).reply(200, tasks);
    const pinia = createPinia();

    const taskStore = useTaskStore(pinia);

    await taskStore.fetchTasks();

    expect(taskStore.tasks).toEqual(tasks);
  });

  it('adds a task', async () => {
    const newTask: Task = {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      priority: 1,
    };

    axiosMock.onPost(TASKS_ENDPOINT).reply(200);
    const pinia = createPinia();

    const taskStore = useTaskStore(pinia);

    await taskStore.addTask(newTask);

    expect(taskStore.tasks).toContainEqual(newTask);
  });

  it('updates a task', async () => {
    const task: Task = {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      priority: 1,
    };
    const updatedTask: Task = { ...task, name: 'Updated Task 1' };

    axiosMock.onPut(`${TASKS_ENDPOINT}/${task.id}`).reply(200);
    const pinia = createPinia();

    const taskStore = useTaskStore(pinia);
    taskStore.tasks.push(task);

    await taskStore.updateTask(updatedTask);

    expect(taskStore.tasks).toContainEqual(updatedTask);
  });

  it('deletes a task', async () => {
    const task: Task = {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      priority: 1,
    };

    axiosMock.onDelete(`${TASKS_ENDPOINT}/${task.id}`).reply(200);
    const pinia = createPinia();

    const taskStore = useTaskStore(pinia);

    await taskStore.deleteTask(task.id);

    expect(taskStore.tasks).not.toContainEqual(task);
  });

  it('handles fetch tasks error', async () => {
    axiosMock.onGet(TASKS_ENDPOINT).reply(500);

    const pinia = createPinia();
    const taskStore = useTaskStore(pinia);
    const errorStore = useErrorStore(pinia);

    await taskStore.fetchTasks();

    expect(errorStore.message).toBeTruthy();
    expect(taskStore.tasks).toEqual([]);
  });

  it('handles update task error', async () => {
    const task: Task = {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      priority: 1,
    };
    const updatedTask: Task = { ...task, name: 'Updated Task 1' };

    axiosMock.onPut(`${TASKS_ENDPOINT}/${task.id}`).reply(500);

    const pinia = createPinia();
    const taskStore = useTaskStore(pinia);
    const errorStore = useErrorStore(pinia);
    taskStore.tasks.push(task);

    await taskStore.updateTask(updatedTask);

    expect(errorStore.message).toBeTruthy();
    expect(taskStore.tasks).toContainEqual(task);
    expect(taskStore.tasks).not.toContainEqual(updatedTask);
  });

  it('handles delete task error', async () => {
    const task: Task = {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      priority: 1,
    };

    axiosMock.onDelete(`${TASKS_ENDPOINT}/${task.id}`).reply(500);

    const pinia = createPinia();
    const taskStore = useTaskStore(pinia);
    const errorStore = useErrorStore(pinia);
    taskStore.tasks.push(task);

    await taskStore.deleteTask(task.id);

    expect(errorStore.message).toBeTruthy();
    expect(taskStore.tasks).toContainEqual(task);
  });
});
