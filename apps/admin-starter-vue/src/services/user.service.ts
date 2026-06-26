import { apiClient } from './api.client';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface UsersResponse {
  data: UserRecord[];
  total: number;
  page: number;
  pageSize: number;
}

export const UserService = {
  getAll: (filters: Record<string, string | number> = {}) =>
    apiClient.get<UsersResponse>('/users', filters),
  create: (data: Partial<UserRecord>) =>
    apiClient.post<UserRecord>('/users', data),
  update: (id: string, data: Partial<UserRecord>) =>
    apiClient.put<UserRecord>(`/users/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ success: boolean }>(`/users/${id}`),
};
