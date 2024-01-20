import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from "@angular/fire/app"
import { provideFirestore, getFirestore } from "@angular/fire/firestore"
import { provideStorage, getStorage } from "@angular/fire/storage"

import {provideAnimations} from '@angular/platform-browser/animations'
import {provideToastr} from "ngx-toastr"

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideToastr(),
  importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage()))
  ]
};
