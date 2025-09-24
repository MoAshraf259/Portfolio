const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api/v1';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    const errorBody = await safeJson(response);
    const message = errorBody?.message ?? `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
}

const buildInit = (method: string, body?: unknown, init?: RequestInit): RequestInit => {
  const headers = new Headers(init?.headers ?? {});
  if (body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return {
    ...init,
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : init?.body,
  };
};

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, init),
  post: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, buildInit('POST', body, init)),
  put: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, buildInit('PUT', body, init)),
  patch: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, buildInit('PATCH', body, init)),
  delete: <T>(path: string, init?: RequestInit) =>
    request<T>(path, buildInit('DELETE', undefined, init)),
};
