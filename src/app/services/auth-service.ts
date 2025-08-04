import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  cadastrar(dados: RegisterRequest) : Observable<any> {
    return this.http.post(`${this.API_URL}/register`, dados)
  }

  logar(dados: LoginRequest) : Observable<any> {
    return this.http.post(`${this.API_URL}/login`, dados)
  }
 }
