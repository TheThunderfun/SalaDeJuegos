import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { key } from '../../../environmentConfig';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AuthService } from '../../Servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginsCollection: any[] = [];

  email: string = '';
  password: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private firestore: Firestore,
    public auth: Auth,
    private authService: AuthService
  ) {}

  usuario: string | null = null;

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      this.usuario = this.authService.getCurrentUser()?.email;
    }
  }

  async onLogin() {
    try {
      const res = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      await this.showAlert(
        'Inicio de sesión exitoso',
        'Aceptar',
        `Se inició sesión correctamente con el email: ${this.email}`,
        'success'
      );

      this.router.navigate(['/home']);
    } catch (e) {
      console.log(e);
      await this.showAlert(
        'Error al ingresar datos',
        'Aceptar',
        `Mail o contraseña erroneos`,
        'error'
      );
    }
  }
  logOut() {
    signOut(this.auth).then(() => {
      console.log(this.auth.currentUser?.email);
    });
  }

  Login() {
    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), user: this.email });
  }

  goToRegistro() {
    this.router.navigate(['/signup']);
  }

  accesoRapido1() {
    this.email = 'usuarioAnonimo1@gmail.com';
    this.password = '123456';
  }

  accesoRapido2() {
    this.email = 'usuarioAnonimo2@gmail.com';
    this.password = '123456';
  }

  async showAlert(
    strTitle: string,
    strButton: string,
    strtext: string,
    strIcon: string
  ) {
    await Swal.fire({
      title: strTitle,
      text: strtext,
      icon: strIcon as any,
      confirmButtonText: strButton,
    });
  }
}
