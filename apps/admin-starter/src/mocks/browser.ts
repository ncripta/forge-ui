import { setupWorker } from 'msw/browser';
import { userHandlers } from './handlers/users';
import { projectHandlers } from './handlers/projects';

export const worker = setupWorker(...userHandlers, ...projectHandlers);
