import { Component } from '@angular/core';
import { ScoreboardsService } from '../../Servicios/scoreboards.service';
import { AuthService } from '../../Servicios/auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent {
  palabras: string[] = [
    'venenoso',
    'malevolo',
    'futbol',
    'castigo',
    'grieta',
    'invocador',
    'diamante',
    'obsidiana',
  ];
  palabraAdivinar: string = '';
  letrasEncontradas: string[] = [];
  letrasIncorrectas: string[] = [];
  maxIntentos: number = 5;
  mensaje: string = '';
  juegoTerminado: boolean = false;
  puntos: number = 0;

  constructor(
    private svPuntaje: ScoreboardsService,
    private svAuth: AuthService,
  ) {
    this.iniciarJuego();
  }

  iniciarJuego() {
    const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    this.palabraAdivinar = this.palabras[indiceAleatorio];
    this.letrasEncontradas = [];
    this.letrasIncorrectas = [];
    this.mensaje = '';
    this.juegoTerminado = false;
  }

  get displayWord() {
    return this.palabraAdivinar
      .split('')
      .map((letra) => (this.letrasEncontradas.includes(letra) ? letra : '_'))
      .join(' ');
  }

  get intentosRestantes() {
    return this.juegoTerminado
      ? 0
      : this.maxIntentos - this.letrasIncorrectas.length;
  }

  seleccionarLetra(letra: string) {
    if (!this.juegoTerminado) {
      if (
        !this.letrasEncontradas.includes(letra) &&
        !this.letrasIncorrectas.includes(letra)
      ) {
        if (this.palabraAdivinar.includes(letra)) {
          this.letrasEncontradas.push(letra);
        } else {
          this.letrasIncorrectas.push(letra);
        }
      }

      this.comprobarEstadoJuego();
    }
  }

  comprobarEstadoJuego() {
    if (this.letrasIncorrectas.length >= this.maxIntentos) {
      this.mensaje = '¡Perdiste! La palabra era: ' + this.palabraAdivinar;
      this.puntos = 0;
      this.juegoTerminado = true;
    } else if (this.displayWord.replace(/ /g, '') === this.palabraAdivinar) {
      this.mensaje = '¡Felicidades, adivinaste la palabra!';
      this.puntos++;
      this.reiniciarJuego();
    }
  }

  letraSeleccionada(letra: string): boolean {
    return (
      this.letrasEncontradas.includes(letra) ||
      this.letrasIncorrectas.includes(letra)
    );
  }

  reiniciarJuego() {
    this.svPuntaje.GuardarPuntaje(
      this.svAuth.getCurrentUser() ?? 'Usuario anonimo',
      'Ahorcado',
      this.puntos,
    );
    this.iniciarJuego();
    this.maxIntentos = 5;
  }
}
