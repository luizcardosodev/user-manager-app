import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../models/DepartmentModel';

@Injectable()
export class DepartmentService {

  private apiUrl = 'http://localhost:8080/api/v1/departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(this.apiUrl);
  }
}
