import { Component } from '@angular/core';
import { MayorMenorService } from '../../Servicios/mayor-menor.service';

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

  constructor(private servMayorMenor: MayorMenorService) {}

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

    this.tomarCarta();
  }

  tomarCarta() {
    this.servMayorMenor.obtenerCarta(this.mazoId).subscribe((data) => {
      this.cartaSiguiente = data.cards[0]; // Asigna la nueva carta como carta siguiente
      this.cartasRestantes = data.remaining + 1; // Actualiza las cartas restantes

      if (!this.cartaActual) {
        this.cartaActual = this.cartaSiguiente; // Si es la primera carta, inicializa carta actual
        this.tomarCarta(); // Llama a tomarCarta nuevamente para obtener la siguiente carta
      }
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
    this.tomarCarta(); // Obtén la siguiente carta para la próxima ronda

    if (this.vidas <= 0) {
      this.mensaje = 'Te quedaste sin vidas. Fin del juego.';
    }
  }

  obtenerValorCarta(carta: any): number {
    switch (carta.value) {
      case 'AS':
        return 14; // Asigna 14 al As
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
    this.servMayorMenor.obtenerMazo().subscribe((data) => {
      this.mazoId = data.deck_id;
    });
    this.iniciarJuego();
  }

  obtenerImagenCarta() {
    return this.cartaActual ? this.cartaActual.image : '';
  }
}
