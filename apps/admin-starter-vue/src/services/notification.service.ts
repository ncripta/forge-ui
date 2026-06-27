import { apiClient } from './api.client';

export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  data: NotificationRecord[];
  unreadCount: number;
}

export const NotificationService = {
  getAll: () =>
    apiClient.get<NotificationsResponse>('/notifications'),
  markAsRead: (id: string) =>
    apiClient.put<NotificationRecord>(`/notifications/${id}/read`, {}),
  markAllAsRead: () =>
    apiClient.post<{ success: boolean }>('/notifications/mark-all-read', {}),
};
