import { Routes } from '@angular/router';
import { Landingpage } from './landingpage/landingpage';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { HomeGestor } from './home-gestor/home-gestor';
import { HomeColaborador } from './home-colaborador/home-colaborador';
import { Colaboradores } from './colaboradores/colaboradores';
import { Gestor } from './layouts/gestor/gestor'
import { Viagens } from './viagens/viagens';

export const routes: Routes = [
  { path: '', component: Landingpage },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },

  {
    path: 'gestor',
    component: Gestor,
    children: [
      { path: 'home', component: HomeGestor },
      { path: 'colaboradores', component: Colaboradores },
      { path: 'viagens', component: Viagens }
    ]
  }
];

