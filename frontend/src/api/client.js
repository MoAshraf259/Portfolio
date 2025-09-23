const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1';
async function request(path, init) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
        },
        ...init,
    });
    if (!response.ok) {
        const errorBody = await safeJson(response);
        const message = errorBody?.message ?? `Request failed with status ${response.status}`;
        throw new Error(message);
    }
    return response.status === 204 ? undefined : (await response.json());
}
async function safeJson(response) {
    try {
        return await response.json();
    }
    catch (error) {
        return null;
    }
}
export const apiClient = {
    get: (path) => request(path),
    post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
};
