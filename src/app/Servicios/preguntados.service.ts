import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  private apiUrl = 'https://api.jikan.moe/v4'; 

  constructor(private http: HttpClient) {}


  obtenerPersonajes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/anime/21/characters`); 
  }
}
