import { z } from 'zod';
import { insertLanguageSchema, insertResourceSchema, languages, resources, statistics } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
  serverError: z.object({ message: z.string() }),
};

export const api = {
  languages: {
    list: {
      method: 'GET' as const,
      path: '/api/languages',
      responses: {
        200: z.array(z.custom<typeof languages.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/languages/:slug',
      responses: {
        200: z.custom<typeof languages.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    resources: {
      method: 'GET' as const,
      path: '/api/languages/:id/resources',
      responses: {
        200: z.array(z.custom<typeof resources.$inferSelect>()),
      },
    },
  },
  statistics: {
    list: {
      method: 'GET' as const,
      path: '/api/statistics',
      responses: {
        200: z.array(z.custom<typeof statistics.$inferSelect>()),
      },
    },
  },
  chat: {
    method: 'POST' as const,
    path: '/api/chat',
    input: z.object({ message: z.string() }),
    responses: {
      200: z.object({ response: z.string() }),
      500: errorSchemas.serverError,
    },
  },
};
