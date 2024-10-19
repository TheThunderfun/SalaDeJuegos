import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { User } from '@angular/fire/auth';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userEmail: string = 'No disponible';
  user: any = null;
  isLoggedOut: boolean = true;

  constructor(
    private router: Router,
    public auth: Auth,
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.userEmail = user.email || 'Perfil'; // Si el usuario no tiene email, muestra "No disponible"
        this.isLoggedOut = false; // Si hay un usuario logueado, el estado de isLoggedOut es falso
      } else {
        this.user = null;
        this.userEmail = 'Perfil'; // Si no hay usuario logueado, muestra "No disponible"
        this.isLoggedOut = true; // Si no hay usuario, el estado es true (no logueado)
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToAbout() {
    this.router.navigate(['/aboutme']);
  }
  goToChat() {
    this.router.navigate(['/chat']);
  }
  mostrarPerfil(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (selectedValue === 'logoutSelect') {
      this.logout();
      target.selectedIndex = 0;
    }
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  goToScoreboard() {
    this.router.navigate(['/scoreboard']);
  }

  goToEncuesta() {
    this.router.navigate(['/encuesta']);
  }
}
