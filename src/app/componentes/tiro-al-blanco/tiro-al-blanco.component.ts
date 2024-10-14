import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiro-al-blanco',
  templateUrl: './tiro-al-blanco.component.html',
  styleUrls: ['./tiro-al-blanco.component.scss'],
})
export class TiroAlBlancoComponent {
  score: number = 0;
  targets: any[] = [];
  gameInterval: any;
  timerInterval: any;
  empezo: boolean = false;
  vidas: number = 3;
  tiempoLimite: number = 30;
  dificultad: string = '';
  tiempoRestante: number = this.tiempoLimite;
  aparicion: number = 2000;

  startGame() {
    if (this.empezo === false) {
      this.score = 0;
      this.targets = [];
      this.tiempoRestante = this.tiempoLimite; // Reiniciar el tiempo restante
      this.gameInterval = setInterval(() => this.generateTarget(), 1000);
      this.timerInterval = setInterval(() => this.updateTimer(), 1000); // Iniciar el temporizador
      this.empezo = true;
    }
  }
  setDificultad(nivel: string) {
    this.dificultad = nivel;
  }
  updateTimer() {
    this.tiempoRestante--;
    if (this.tiempoRestante <= 0) {
      this.endGame(); // Finalizar el juego cuando el tiempo se agota
    }
  }

  endGame() {
    clearInterval(this.gameInterval); // Detener el intervalo de generación de objetivos
    clearInterval(this.timerInterval); // Detener el temporizador
    this.empezo = false; // Reiniciar el estado del juego
  
    console.log(`Juego terminado. Puntaje final: ${this.score}`);
    this.showAlert(
      'Puntaje',
      'Aceptar',
      `El puntaje fue: ${this.score}`,
      'success',
    );
  }

  generateTarget() {
    switch (this.dificultad) {
      case 'facil':
        this.aparicion = 2000;
        break;
      case 'normal':
        this.aparicion = 1500;
        break;
      case 'dificil':
        this.aparicion = 700;
        break;
    }
    const targetWidth = 50; // Ancho del objetivo
    const targetHeight = 50; // Alto del objetivo
    const areaWidth = 800; // Ancho del área target-area
    const areaHeight = window.innerHeight * 0.6; // Altura de target-area (60vh)

    const target = {
      top: Math.random() * (areaHeight - targetHeight), // Posición top dentro del área
      left: Math.random() * (areaWidth - targetWidth), // Posición left dentro del área
    };

    this.targets.push(target);

    setTimeout(() => {
      const index = this.targets.indexOf(target);
      if (index !== -1) {
        this.targets.splice(index, 1);
      }
    }, this.aparicion);
  }

  shootTarget(target: any) {
    this.score++;
    const index = this.targets.indexOf(target);
    if (index !== -1) {
      this.targets.splice(index, 1);
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
}
