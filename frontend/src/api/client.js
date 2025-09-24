const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';
async function request(path, init) {
    const response = await fetch(`${API_BASE_URL}${path}`, init);
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
const buildInit = (method, body, init) => {
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
    get: (path, init) => request(path, init),
    post: (path, body, init) => request(path, buildInit('POST', body, init)),
    put: (path, body, init) => request(path, buildInit('PUT', body, init)),
    patch: (path, body, init) => request(path, buildInit('PATCH', body, init)),
    delete: (path, init) => request(path, buildInit('DELETE', undefined, init)),
};
