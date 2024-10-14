import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { key } from '../../../environmentConfig';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { LoginService } from '../../Servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  public email: string = '';
  public password: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  async onRegister() {
    try {
      const response = await this.loginService.signUp(
        this.email,
        this.password,
      );

      await this.showAlert(
        'Inicio de sesión exitoso',
        'Aceptar',
        `Se inició sesión correctamente con el email: ${this.email}`,
        'success',
      );
      this.loginService.signIn(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (e) {
      console.log(e);
      await this.showAlert('Error al ingresar datos', 'Aceptar', e, 'error');
    }
  }

  async showAlert(
    strTitle: string,
    strButton: string,
    strtext: any,
    strIcon: string,
  ) {
    await Swal.fire({
      title: strTitle,
      text: strtext,
      icon: strIcon as any,
      confirmButtonText: strButton,
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
