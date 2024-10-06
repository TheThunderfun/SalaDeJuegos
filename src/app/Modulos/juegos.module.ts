import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from '../componentes/ahorcado/ahorcado.component';
import { MayorMenorComponent } from '../componentes/mayor-menor/mayor-menor.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MayorMenorService } from '../Servicios/mayor-menor.service';
import { PreguntadosComponent } from '../componentes/preguntados/preguntados.component';
import { PreguntadosService } from '../Servicios/preguntados.service';
import { TiroAlBlancoComponent } from '../componentes/tiro-al-blanco/tiro-al-blanco.component';

@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    TiroAlBlancoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'ahorcado', component: AhorcadoComponent },
      {
        path: 'mayor-menor',
        component: MayorMenorComponent,
      },
      {
        path: 'preguntados',
        component: PreguntadosComponent,
      },
      {
        path: 'tiro-al-blanco',
        component: TiroAlBlancoComponent,
      },
    ]),
  ],
  providers: [MayorMenorService, PreguntadosService],
})
export class JuegosModule {}
