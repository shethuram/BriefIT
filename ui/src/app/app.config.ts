import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { customInterceptor } from './interceptors/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([customInterceptor])),
    JwtHelperService ,
    JwtModule,  
    {
      provide: JWT_OPTIONS, 
      useValue: {
        tokenGetter: () => sessionStorage.getItem('acesstoken'),  
        allowedDomains: ['https://webapp-api.runasp.net'],
        disallowedRoutes: []  
      }
    },
  ]

};
