import { Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { AboutComponent } from './componentes/about/about.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';

export const routes: Routes = [
  // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'aboutme', component: AboutComponent },
  { path: 'signup', component: RegistroComponent },
  { path: 'chat', component: ChatComponent },
  {
    path: 'juegos',
    loadChildren: () =>
      import('./Modulos/juegos.module').then((m) => m.JuegosModule),
  },
  // La ruta comodin debe ir siempre al final
  { path: '**', component: PageNotFoundComponent },
];
