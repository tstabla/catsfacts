import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CATS_API } from './services/cats/cats.config';
import { CatsApi } from './services/cats/cats.api';
import { CatsApiMock } from './services/cats/cats.api.mock';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(
      withFetch()
    ),
    {
      provide: CATS_API,
      useClass: CatsApi
      // useClass: CatsApiMock
    }
  ]
};
