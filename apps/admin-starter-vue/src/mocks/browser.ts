import { setupWorker } from 'msw/browser';
import { userHandlers } from './handlers/users';
import { projectHandlers } from './handlers/projects';
import { notificationHandlers } from './handlers/notifications';

export const worker = setupWorker(...userHandlers, ...projectHandlers, ...notificationHandlers);
