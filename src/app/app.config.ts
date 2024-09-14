import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environmentConfig';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }),
//      provideRouter(routes),
//       provideFirebaseApp(() => initializeApp({"projectId":"saladejuegos-45c22","appId":"1:447948976322:web:12b6baed6dea4e54954b5b","storageBucket":"saladejuegos-45c22.appspot.com","apiKey":"AIzaSyDnH7YDcxZ8oq6dMUrIwlnUOi8O_oIB2Xg","authDomain":"saladejuegos-45c22.firebaseapp.com","messagingSenderId":"447948976322"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
// };
