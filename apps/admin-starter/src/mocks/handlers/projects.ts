import { http, HttpResponse, delay } from 'msw';
import { mockProjects } from '../data/projects';
import type { ProjectRecord } from '@/services/project.service';

let projects = [...mockProjects];

export const projectHandlers = [
  // GET /api/projects
  http.get('/api/projects', async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status') || '';

    let filtered = [...projects];
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      );
    }
    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }

    return HttpResponse.json({ data: filtered, total: filtered.length });
  }),

  // POST /api/projects
  http.post('/api/projects', async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as Partial<ProjectRecord>;
    const newProject: ProjectRecord = {
      id: String(Date.now()),
      name: body.name || '',
      description: body.description || '',
      icon: body.icon || 'Globe',
      iconBg: body.iconBg || 'bg-sky-50 text-sky-600',
      status: 'active',
      progress: 0,
      members: [{ fallback: 'TU' }],
      updatedAt: 'Justo ahora',
    };
    projects.unshift(newProject);
    return HttpResponse.json(newProject, { status: 201 });
  }),

  // PUT /api/projects/:id
  http.put('/api/projects/:id', async ({ params, request }) => {
    await delay(300);
    const body = (await request.json()) as Partial<ProjectRecord>;
    const index = projects.findIndex((p) => p.id === params.id);
    if (index === -1) return HttpResponse.json({ message: 'No encontrado' }, { status: 404 });
    projects[index] = { ...projects[index]!, ...body };
    return HttpResponse.json(projects[index]);
  }),

  // DELETE /api/projects/:id
  http.delete('/api/projects/:id', async ({ params }) => {
    await delay(300);
    projects = projects.filter((p) => p.id !== params.id);
    return HttpResponse.json({ success: true });
  }),
];
