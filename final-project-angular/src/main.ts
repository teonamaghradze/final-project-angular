// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/core/components/app-component/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
// import { EmployeeService } from './app/Features/Employees-feature/services/employee.service';

import { provideRouter } from '@angular/router';

import { ROUTES } from './app/shared/routes/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideAnimations(),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      NoopAnimationsModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
