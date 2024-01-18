import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideFirebaseApp,initializeApp} from "@angular/fire/app"
import {provideFirestore, getFirestore} from "@angular/fire/firestore"
import {provideStorage, getStorage} from "@angular/fire/storage"
import {environment} from "../environments/environment.development"

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
      provideFirestore(()=>getFirestore()),
      provideStorage(()=>getStorage())
    )
  ]
};
