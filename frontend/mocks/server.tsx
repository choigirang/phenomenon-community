import { setupServer } from 'msw/node';
import { handler } from './handlers';

export const worker = setupServer(...handler);
