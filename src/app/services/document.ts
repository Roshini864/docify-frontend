import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private baseUrl = 'http://https://docify-backend-production-df37.up.railway.app/api/documents';

  constructor(private http: HttpClient) {}

  generate(templateId: number, values: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generate`, { templateId, values });
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }

  download(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  }
}