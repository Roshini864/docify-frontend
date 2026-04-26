import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemplateService {

  private baseUrl = 'https://docify-backend-production-df37.up.railway.app';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(name: string, content: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { name, content });
  }

  update(id: number, name: string, content: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, { name, content });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}