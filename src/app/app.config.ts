import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  withHashLocation,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { settokenInterceptor } from './core/interceptor/settoken/settoken.interceptor';
import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';
import { handlEerrorInterceptor } from './core/interceptor/handlEerror/handl-eerror.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        settokenInterceptor,
        loadingInterceptor,
        handlEerrorInterceptor,
      ])
    ),
    provideAnimations(),

    provideToastr(),
  ],
};
