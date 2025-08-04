import { Routes } from '@angular/router';
import { Landingpage } from './landingpage/landingpage';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { HomeGestor } from './home-gestor/home-gestor';
import { HomeColaborador } from './home-colaborador/home-colaborador';
import { Colaboradores } from './colaboradores/colaboradores';

export const routes: Routes = [
    { path: '', component: Landingpage },
    { path: 'login', component: Login},
    { path: 'cadastro', component: Cadastro },
    { path: 'gestor/home', component: HomeGestor },
    { path: 'gestor/colaboradores', component: Colaboradores },
    { path: 'colab/home', component: HomeColaborador }
];
