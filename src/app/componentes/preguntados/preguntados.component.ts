import { Component } from '@angular/core';
import { PreguntadosService } from '../../Servicios/preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
})
export class PreguntadosComponent {
  personaje: any = null; // Para almacenar el personaje actual
  opciones: any[] = []; // Para almacenar las opciones de respuesta
  puntaje: number = 0;
  mensaje: string = '';
  vidas: number = 3;

  constructor(private preguntadosService: PreguntadosService) {}

  ngOnInit(): void {
    this.obtenerPersonaje();
  }

  obtenerPersonaje(): void {
    this.preguntadosService.obtenerPersonajes().subscribe(
      (data) => {
        // Seleccionar un personaje aleatorio
        const indiceAleatorio = Math.floor(Math.random() * data.data.length);
        this.personaje = data.data[indiceAleatorio];

        // Generar opciones
        this.generarOpciones(indiceAleatorio, data.data);
      },
      (error) => {
        console.error('Error al obtener personajes:', error);
      },
    );
  }

  generarOpciones(correctoIndex: number, todosPersonajes: any[]): void {
    this.opciones = [todosPersonajes[correctoIndex]]; // Opción correcta

    // Agregar opciones incorrectas
    while (this.opciones.length < 4) {
      const indiceIncorrecto = Math.floor(
        Math.random() * todosPersonajes.length,
      );
      if (
        indiceIncorrecto !== correctoIndex &&
        !this.opciones.includes(todosPersonajes[indiceIncorrecto])
      ) {
        this.opciones.push(todosPersonajes[indiceIncorrecto]);
      }
    }

    // Mezclar las opciones
    this.opciones = this.opciones.sort(() => Math.random() - 0.5);
  }

  seleccionarOpcion(personajeSeleccionado: any): void {
    if (personajeSeleccionado === this.personaje) {
      this.puntaje++;
      this.mensaje = '¡Correcto!';
    } else {
      this.mensaje = 'Incorrecto. Intenta de nuevo.';
      this.vidas--;
    }
    // Reiniciar el juego para la próxima pregunta
    this.obtenerPersonaje(); // Vuelve a cargar un nuevo personaje
  }

  reiniciarJuego() {
    this.puntaje = 0;
    this.vidas = 3;
  }
}
