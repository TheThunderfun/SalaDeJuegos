import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user); // Actualiza el estado del usuario
    });
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value; // Retorna true si hay un usuario autenticado
  }

  getCurrentUser() {
    return this.userSubject.value; // Devuelve el usuario actual
  }
}
