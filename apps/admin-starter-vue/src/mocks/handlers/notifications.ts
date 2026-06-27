import { http, HttpResponse, delay } from 'msw';
import { mockNotifications } from '../data/notifications';

let notifications = [...mockNotifications];

export const notificationHandlers = [
  // GET /api/notifications
  http.get('/api/notifications', async () => {
    await delay(200);
    const unreadCount = notifications.filter((n) => !n.read).length;
    return HttpResponse.json({ data: notifications, unreadCount });
  }),

  // PUT /api/notifications/:id/read
  http.put('/api/notifications/:id/read', async ({ params }) => {
    await delay(150);
    const index = notifications.findIndex((n) => n.id === params.id);
    if (index === -1) return HttpResponse.json({ message: 'No encontrada' }, { status: 404 });
    notifications[index] = { ...notifications[index]!, read: true };
    return HttpResponse.json(notifications[index]);
  }),

  // POST /api/notifications/mark-all-read
  http.post('/api/notifications/mark-all-read', async () => {
    await delay(200);
    notifications = notifications.map((n) => ({ ...n, read: true }));
    return HttpResponse.json({ success: true });
  }),
];
