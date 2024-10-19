import { Component } from '@angular/core';
import { MayorMenorService } from '../../Servicios/mayor-menor.service';
import { ScoreboardsService } from '../../Servicios/scoreboards.service';
import { AuthService } from '../../Servicios/auth.service';

@Component({
  selector: 'app-mayor-menor',
  standalone: false,
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss'],
})
export class MayorMenorComponent {
  mazoId: string = '';
  cartaActual: any;
  cartaSiguiente: any;
  mensaje: string = '';
  puntaje: number = 0;
  cartasRestantes: number = 0;
  vidas: number = 3;

  constructor(
    private servMayorMenor: MayorMenorService,
    private svPuntaje: ScoreboardsService,
    private svAuth: AuthService,
  ) {}

  ngOnInit() {
    this.servMayorMenor.obtenerMazo().subscribe((data) => {
      this.mazoId = data.deck_id;
      this.iniciarJuego();
    });
  }

  iniciarJuego() {
    this.puntaje = 0;
    this.vidas = 3;
    this.mensaje = '';
    this.cartaActual = null;
    this.cartaSiguiente = null;

    this.tomarCartaInicial();
    console.log(this.cartaActual);
    console.log(this.cartaSiguiente);
  }

  tomarCartaInicial() {
    this.servMayorMenor.obtenerCarta(this.mazoId).subscribe((data) => {
      this.cartaActual = data.cards[0]; // Establece la carta actual

      // Ahora toma la segunda carta
      this.servMayorMenor.obtenerCarta(this.mazoId).subscribe((data) => {
        this.cartaSiguiente = data.cards[0]; // Establece la carta siguiente
        this.cartasRestantes = data.remaining; // Actualiza las cartas restantes
      });
    });
  }
  tomarCarta() {
    this.servMayorMenor.obtenerCarta(this.mazoId).subscribe((data) => {
      this.cartaSiguiente = data.cards[0]; // Agarro la nueva carta como carta siguiente
      this.cartasRestantes = data.remaining; // Actualiza las cartas restantes
      console.log(data.cards[0]);
    });
  }

  elegirMayor() {
    this.compararCartas('mayor');
  }

  elegirMenor() {
    this.compararCartas('menor');
  }

  compararCartas(opcion: string) {
    const valorActual = this.obtenerValorCarta(this.cartaActual);
    const valorSiguiente = this.obtenerValorCarta(this.cartaSiguiente);
    console.log(valorActual, 'Actual');
    console.log(valorSiguiente, 'Siguiente');

    if (
      (opcion === 'mayor' && valorSiguiente > valorActual) ||
      (opcion === 'menor' && valorSiguiente < valorActual)
    ) {
      this.mensaje = '¡Correcto! :)';
      this.puntaje++;
    } else {
      this.mensaje = 'Fallaste :(';
      this.vidas--;
    }

    this.cartaActual = this.cartaSiguiente; // Mueve la carta siguiente a la carta actual
    this.tomarCarta(); // Agarro la siguiente carta para la próxima

    if (this.vidas <= 0) {
      this.mensaje = 'Te quedaste sin vidas. Fin del juego.';
    }
  }

  obtenerValorCarta(carta: any): number {
    switch (carta.value) {
      case 'ACE':
        return 14; // As
      case 'KING':
        return 13; // Rey
      case 'QUEEN':
        return 12; // Reina
      case 'JACK':
        return 11; // Jack
      default:
        return parseInt(carta.value);
    }
  }

  reiniciarJuego() {
    this.svPuntaje.GuardarPuntaje(
      this.svAuth.getCurrentUser() ?? 'Usuario anonimo',
      'Mayor-menor',
      this.puntaje,
    );
    this.servMayorMenor.obtenerMazo().subscribe((data) => {
      this.mazoId = data.deck_id;
      this.cartasRestantes = data.remaining;
    });
    this.iniciarJuego();
  }

  obtenerImagenCarta() {
    return this.cartaActual ? this.cartaActual.image : '';
  }
}
