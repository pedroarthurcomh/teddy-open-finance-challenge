import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../types/customer-response.type';
import { Customer } from '../types/customer.type';
import { NewUser } from '../types/new-user.type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly URL_BASE: string = 'https://boasorte.teddybackoffice.com.br';
  updateCustomers$: EventEmitter<any> = new EventEmitter;

  constructor(private http: HttpClient) {}

  getUsername() {
    return localStorage.getItem('username');
  }

  getAllUsers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.URL_BASE}/users`);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.URL_BASE}/users/${id}`);
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
