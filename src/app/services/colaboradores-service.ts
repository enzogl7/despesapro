import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Colaborador } from '../colaboradores/colaboradores';

export interface ConviteRequest {
  emailGestor: string;
  nomeColaborador: string;
  emailColaborador: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {
  private readonly API_URL = environment.apiUrl + '/gestor/colaborador';  
  
  constructor(private http: HttpClient) {}

  gerarConviteColaborador(dados: ConviteRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/gerar-convite`, dados);
  }

  listarColaboradoresPorGestor() : Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.API_URL}/listar-por-gestor`);
  }

  
}
