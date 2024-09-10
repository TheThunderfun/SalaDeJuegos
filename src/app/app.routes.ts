import { Routes } from '@angular/router';
import { AboutComponent } from './componentes/about/about.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
//import { ProductsComponent } from './componentes/products/products.component';

export const routes: Routes = [
  // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  // La ruta comodin debe ir siempre al final
  { path: '**', component: PageNotFoundComponent },
];
