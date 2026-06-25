import { apiClient } from './api.client';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  avatar?: string;
}

export interface UsersResponse {
  data: UserRecord[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UserFilters {
  page?: number;
  search?: string;
  role?: string;
  status?: string;
}

export const UserService = {
  getAll: (filters: UserFilters = {}) =>
    apiClient.get<UsersResponse>('/users', filters as Record<string, string | number>),

  getById: (id: string) =>
    apiClient.get<UserRecord>(`/users/${id}`),

  create: (data: Omit<UserRecord, 'id' | 'createdAt'>) =>
    apiClient.post<UserRecord>('/users', data),

  update: (id: string, data: Partial<UserRecord>) =>
    apiClient.put<UserRecord>(`/users/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<{ success: boolean }>(`/users/${id}`),

  deleteBulk: (ids: string[]) =>
    apiClient.post<{ success: boolean }>('/users/bulk-delete', { ids }),
};
