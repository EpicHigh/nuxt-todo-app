import fetchWithJson from '~/services/utils';

interface Task {
  id?: number;
  name: string;
  description: string;
  priority: number;
}

const BASE_URL = 'http://localhost:3000/tasks'; // change to your json-server URL

export async function createTask(task: Task) {
  const data = await fetchWithJson<Task>(BASE_URL, {
    method: 'POST',
    body: task,
  });
  return data;
}

export async function getTasks() {
  const data = await fetchWithJson<Task[]>(BASE_URL);
  return data;
}

export async function updateTask(id: number, updatedTask: Task) {
  const data = await fetchWithJson<Task>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: updatedTask,
  });
  return data;
}

export async function deleteTask(id: number) {
  await fetchWithJson(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}
