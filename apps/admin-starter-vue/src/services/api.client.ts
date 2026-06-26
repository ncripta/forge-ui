const BASE_URL = '/api';

interface RequestOptions {
  params?: Record<string, string | number>;
  body?: unknown;
}

async function request<T>(method: string, path: string, options?: RequestOptions): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  if (options?.params) {
    Object.entries(options.params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }

  const res = await fetch(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error de red' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const apiClient = {
  get: <T>(path: string, params?: Record<string, string | number>) => request<T>('GET', path, { params }),
  post: <T>(path: string, body: unknown) => request<T>('POST', path, { body }),
  put: <T>(path: string, body: unknown) => request<T>('PUT', path, { body }),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
