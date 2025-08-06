import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  cadastrar(dados: RegisterRequest) : Observable<any> {
    return this.http.post(`${this.API_URL}/register`, dados)
  }

  logar(dados: LoginRequest) : Observable<any> {
    return this.http.post(`${this.API_URL}/login`, dados)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token'); 
    }
    return false;
  }
}