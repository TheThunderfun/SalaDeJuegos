import { Component } from '@angular/core';

@Component({
  selector: 'app-tiro-al-blanco',
  templateUrl: './tiro-al-blanco.component.html',
  styleUrls: ['./tiro-al-blanco.component.scss'],
})
export class TiroAlBlancoComponent {
  score: number = 0;
  targets: any[] = [];
  gameInterval: any;

  startGame() {
    this.score = 0;
    this.targets = [];
    this.gameInterval = setInterval(() => this.generateTarget(), 1000);
  }

  generateTarget() {
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
    }, 2000);
  }

  shootTarget(target: any) {
    this.score++;
    const index = this.targets.indexOf(target);
    if (index !== -1) {
      this.targets.splice(index, 1); // Eliminar el objetivo disparado
    }
  }
}
