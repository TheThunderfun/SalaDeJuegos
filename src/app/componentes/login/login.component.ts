import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private fireBaseUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnH7YDcxZ8oq6dMUrIwlnUOi8O_oIB2Xg';
  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      const body = {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      };
      console.log(this.email, this.password);
      this.http.post(this.fireBaseUrl, body).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          alert(`Se inició sesión correctamente con el email: ${this.email}`);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error en el login', error);
          alert(`Email o contrasenia invalidos.`);
        }
      );
    } else {
      console.log('Ingrese usuario y contrasenia validos');
    }
  }
}
