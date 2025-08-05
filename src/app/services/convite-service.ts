import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConviteService {
  private readonly API_URL = environment.apiUrl + '/convite';  
  
  constructor(private http: HttpClient) {}

  validarConvite(token: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/validar/${token}`);
  }

  aceitarConvite(token: string): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/aceitar/${token}`, {});
  }

  recusarConvite(token: string): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/recusar/${token}`, {});
  }
}
