type RequestInitWithBody<T> = Omit<RequestInit, 'body'> & {
  body?: T;
};

async function fetchWithJson<T>(
  url: string,
  options: RequestInitWithBody<T> = {}
): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

export default fetchWithJson;
