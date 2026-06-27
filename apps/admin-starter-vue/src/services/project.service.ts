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

export const ProjectService = {
  getAll: (filters: Record<string, string | number> = {}) =>
    apiClient.get<ProjectsResponse>('/projects', filters),
  create: (data: Pick<ProjectRecord, 'name' | 'description' | 'icon' | 'iconBg'>) =>
    apiClient.post<ProjectRecord>('/projects', data),
  delete: (id: string) =>
    apiClient.delete<{ success: boolean }>(`/projects/${id}`),
};
