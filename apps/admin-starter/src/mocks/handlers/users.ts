import { http, HttpResponse, delay } from 'msw';
import { mockUsers } from '../data/users';
import type { UserRecord } from '@/services/user.service';

let users = [...mockUsers];

export const userHandlers = [
  // GET /api/users (con paginación y filtros)
  http.get('/api/users', async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = 10;
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const role = url.searchParams.get('role') || '';
    const status = url.searchParams.get('status') || '';

    let filtered = [...users];
    if (search) {
      filtered = filtered.filter((u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search));
    }
    if (role) {
      filtered = filtered.filter((u) => u.role === role);
    }
    if (status) {
      filtered = filtered.filter((u) => u.status === status);
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return HttpResponse.json({ data, total, page, pageSize });
  }),

  // GET /api/users/:id
  http.get('/api/users/:id', async ({ params }) => {
    await delay(200);
    const user = users.find((u) => u.id === params.id);
    if (!user) return HttpResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    return HttpResponse.json(user);
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as Partial<UserRecord>;
    const newUser: UserRecord = {
      id: String(Date.now()),
      name: body.name || '',
      email: body.email || '',
      role: body.role || 'USER',
      status: body.status || 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0]!,
    };
    users.unshift(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  // PUT /api/users/:id
  http.put('/api/users/:id', async ({ params, request }) => {
    await delay(400);
    const body = (await request.json()) as Partial<UserRecord>;
    const index = users.findIndex((u) => u.id === params.id);
    if (index === -1) return HttpResponse.json({ message: 'No encontrado' }, { status: 404 });
    users[index] = { ...users[index]!, ...body };
    return HttpResponse.json(users[index]);
  }),

  // DELETE /api/users/:id
  http.delete('/api/users/:id', async ({ params }) => {
    await delay(300);
    users = users.filter((u) => u.id !== params.id);
    return HttpResponse.json({ success: true });
  }),

  // POST /api/users/bulk-delete
  http.post('/api/users/bulk-delete', async ({ request }) => {
    await delay(400);
    const { ids } = (await request.json()) as { ids: string[] };
    users = users.filter((u) => !ids.includes(u.id));
    return HttpResponse.json({ success: true });
  }),
];
