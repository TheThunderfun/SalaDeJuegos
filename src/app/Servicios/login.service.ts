import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {}

  logged: boolean = false;

  signIn(email: string, password: string): Promise<UserCredential | string> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.logged = true;
        return userCredential;
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            return Promise.reject('Contraseña incorrecta. Intenta de nuevo.');
          case 'auth/user-not-found':
            return Promise.reject('Usuario no encontrado. Verifica tu email.');
          case 'auth/invalid-email':
            return Promise.reject(
              'El email ingresado no es válido. Asegúrate de que tenga el formato correcto.',
            );
          case 'auth/weak-password':
            return Promise.reject(
              'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.',
            );
          case 'auth/email-already-in-use':
            return Promise.reject(
              'Este correo electrónico ya está en uso. Intenta con otro.',
            );
          case 'auth/operation-not-allowed':
            return Promise.reject(
              'Este método de autenticación no está habilitado. ',
            );
          case 'auth/too-many-requests':
            return Promise.reject('Demasiadas solicitudes. Intenta más tarde.');
          case 'auth/user-disabled':
            return Promise.reject('Este usuario ha sido deshabilitado. ');
          case 'auth/invalid-credential':
            return Promise.reject(
              'Las credenciales proporcionadas son inválidas. Verifica tu información.',
            );
          default:
            return Promise.reject('Error desconocido: ' + error.message);
        }
      });
  }

  signUp(email: string, password: string): Promise<UserCredential | string> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((response: UserCredential) => {
        return response;
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/missing-email':
            return Promise.reject('El correo electrónico es obligatorio.');
          case 'auth/missing-password':
            return Promise.reject('La contraseña es obligatoria.');
          case 'auth/weak-password':
            return Promise.reject(
              'Contraseña demasiado corta, debe tener al menos 6 caracteres.',
            );
          case 'auth/user-not-found':
            return Promise.reject('Usuario no encontrado.');
          case 'auth/invalid-email':
            return Promise.reject('El email ingresado no es válido.');
          case 'auth/email-already-in-use':
            return Promise.reject('El correo ya está en uso.');
          default:
            return Promise.reject('Error desconocido: ' + error.message);
        }
      });
  }

  signOut() {
    this.auth.signOut();
    this.logged = false;
  }

  isLoggedIn() {
    return this.logged;
  }

  Log(email: string) {
    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), user: email });
  }
}
