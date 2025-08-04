import { Routes } from '@angular/router';
import { Landingpage } from './landingpage/landingpage';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { HomeGestor } from './home-gestor/home-gestor';

export const routes: Routes = [
    { path: '', component: Landingpage },
    { path: 'login', component: Login},
    { path: 'cadastro', component: Cadastro },
    { path: 'home/gestor', component: HomeGestor }
];
