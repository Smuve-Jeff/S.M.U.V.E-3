import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { API_KEY_TOKEN } from './services/ai.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: API_KEY_TOKEN,
      // Attempt to read from global window object (legacy support) or environment variable,
      // falling back to an empty string. The AiService handles the missing key gracefully.
      useFactory: () => (window as any).API_KEY || ''
    }
  ]
};
