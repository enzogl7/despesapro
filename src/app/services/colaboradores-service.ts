import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConviteRequest {
  emailGestor: string;
  nomeColaborador: string;
  emailColaborador: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {
    private readonly API_URL = 'http://localhost:8080/api/gestor/colaborador';  

    constructor(private http: HttpClient) {}

    gerarConviteColaborador(dados: ConviteRequest) : Observable<any> {
        return this.http.post(`${this.API_URL}/gerar-convite`, dados)
    }
  
}
