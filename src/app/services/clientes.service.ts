import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ClientesResponse } from '../types/clientes-response.type';
import { Cliente } from '../types/cliente.type';
import { NewUser } from '../types/new-user.type';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  readonly URL_BASE: string = 'https://boasorte.teddybackoffice.com.br';
  username$= new ReplaySubject<string>(1) ;

  constructor(private http: HttpClient) {}

  getUsername() {
    let username: string = '';
    this.username$.subscribe(name => (username = name)).unsubscribe();
    return username;
  }

  getAllUsers(): Observable<ClientesResponse> {
    return this.http.get<ClientesResponse>(`${this.URL_BASE}/users`);
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.URL_BASE}/users/${id}`);
  }

  newUser(body: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(`${this.URL_BASE}/users`, body);
  }

  editUser(id: number, body: NewUser): Observable<NewUser> {
    return this.http.patch<NewUser>(`${this.URL_BASE}/users`, body);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URL_BASE}/users/${id}`);
  }
}
