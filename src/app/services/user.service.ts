import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';

@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

    getUsers(): Observable<UserModel[]> {
      return this.http.get<UserModel[]>(this.apiUrl);
    }

    addUser(user: any): Observable<UserModel> {
      return this.http.post<UserModel>(this.apiUrl, user);
    }

    updateUser(id: number, user: UserModel): Observable<UserModel> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<UserModel>(url, user);
    }

    deleteUser(id: number): Observable<UserModel> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<UserModel>(url);
    }
}
