import { Component } from '@angular/core';

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

  constructor() {
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
      this.juegoTerminado = true;
    } else if (this.displayWord.replace(/ /g, '') === this.palabraAdivinar) {
      this.mensaje = '¡Felicidades, adivinaste la palabra!';
      this.juegoTerminado = true;
    }
  }

  letraSeleccionada(letra: string): boolean {
    return (
      this.letrasEncontradas.includes(letra) ||
      this.letrasIncorrectas.includes(letra)
    );
  }

  reiniciarJuego() {
    this.iniciarJuego();
    this.maxIntentos = 5;
  }
}
