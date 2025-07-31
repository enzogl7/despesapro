import { Routes } from '@angular/router';
import { Landingpage } from './landingpage/landingpage';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', component: Landingpage },
    { path: 'login', component: Login}
];
