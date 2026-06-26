import { apiClient } from './api.client';

export interface ProjectRecord {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  status: 'active' | 'review' | 'completed' | 'archived';
  progress: number;
  progressColor?: string;
  members: { fallback: string }[];
  updatedAt: string;
}

export interface ProjectsResponse {
  data: ProjectRecord[];
  total: number;
}

export interface ProjectFilters {
  search?: string;
  status?: string;
}

export const ProjectService = {
  getAll: (filters: ProjectFilters = {}) =>
    apiClient.get<ProjectsResponse>('/projects', filters as Record<string, string | number>),

  create: (data: Pick<ProjectRecord, 'name' | 'description' | 'icon' | 'iconBg'>) =>
    apiClient.post<ProjectRecord>('/projects', data),

  update: (id: string, data: Partial<ProjectRecord>) =>
    apiClient.put<ProjectRecord>(`/projects/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<{ success: boolean }>(`/projects/${id}`),
};
