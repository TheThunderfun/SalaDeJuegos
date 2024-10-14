import { Routes } from '@angular/router';
import { authGuard } from './Guard/auth-guard.guard';
import { AboutComponent } from './componentes/about/about.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { noAuthGuard } from './Guard/no-auth-guard.guard';

export const routes: Routes = [
  // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'aboutme', component: AboutComponent },
  {
    path: 'signup',
    component: RegistroComponent,
    canActivate: [noAuthGuard],
  },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  {
    path: 'juegos',
    loadChildren: () =>
      import('./Modulos/juegos.module').then((m) => m.JuegosModule),
  },
  // La ruta comodin debe ir siempre al final
  { path: '**', component: PageNotFoundComponent },
];
