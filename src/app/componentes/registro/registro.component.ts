import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { key } from '../../../environmentConfig';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  public nombre: string = '';
  public apellido: string = '';
  public email: string = '';
  public password: string = '';
  private fireBaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private firestore: Firestore
  ) {}

  onRegister() {
    if (this.email && this.password) {
      const body = {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      };

      this.http.post(this.fireBaseUrl, body).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          alert(`Registro exitoso con el email: ${this.email}`);
          this.guardarUsuario();
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error en el registro', error);
          alert('Hubo un error en el registro. Intenta nuevamente.');
        }
      );
    } else {
      alert('Por favor, ingrese un email y una contraseña válidos.');
    }
  }

  guardarUsuario() {
    const userRef = collection(this.firestore, 'usuarios');

    // Datos a guardar
    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
    };

    addDoc(userRef, userData)
      .then(() => {
        console.log('Datos guardados correctamente en Firestore');
      })
      .catch((error) => {
        console.error('Error al guardar en Firestore', error);
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
