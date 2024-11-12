import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient,withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { TokenInterceptor } from './core/services/interceptors/token.interceptor';

import { LOCALE_ID } from '@angular/core';


export const appConfig: ApplicationConfig = {
  providers: [
    
              provideZoneChangeDetection({ eventCoalescing: true }), 
              provideRouter(routes),
              provideAnimations(),
              provideHttpClient(withInterceptorsFromDi()),
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},  
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, 
              { provide: LOCALE_ID, useValue: 'en-US' }      
            
         ]
};
