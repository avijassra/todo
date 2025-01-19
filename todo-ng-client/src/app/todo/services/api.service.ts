import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000'; // FastAPI backend URL

  constructor(private http: HttpClient) {}

  // User APIs
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/`, user);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`);
  }

  // Task APIs
  createTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks/`, task);
  }

  getTasks(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${userId}`);
  }
}
