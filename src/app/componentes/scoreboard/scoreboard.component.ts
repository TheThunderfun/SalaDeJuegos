import { Component, OnInit } from '@angular/core';
import { ScoreboardsService } from '../../Servicios/scoreboards.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Servicios/auth.service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent {
  tabla: any[] = [];
  constructor(
    private svPuntaje: ScoreboardsService,
    private svAuth: AuthService,
  ) {}

  public mostrarMejoresPuntajes: boolean = true; // Variable para alternar entre tablas
  public tablaMejoresPuntajes: any[] = [];
  public tablaPuntajesUsuario: any[] = [];

  // Función para obtener los mejores puntajes
  async cargarMejoresPuntajes() {
    this.tablaMejoresPuntajes = await this.svPuntaje.obtenerMejoresPuntajes();
    this.mostrarMejoresPuntajes = true; // Mostrar la tabla de mejores puntajes
  }

  // Función para obtener los puntajes de un usuario
  async cargarPuntajesUsuario() {
    const email = this.svAuth.getCurrentUser() || 'No disponible';
    this.tablaPuntajesUsuario =
      await this.svPuntaje.ObtenerPuntajesUsuario(email);
    this.mostrarMejoresPuntajes = false; // Mostrar la tabla de puntajes del usuario
  }
}
