import { Injectable } from "@angular/core"
import { HttpClient,HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import { Pv } from "../models/pv.model"

@Injectable({
  providedIn: "root",
})
export class PvService {
  private apiUrl = `${environment.apiUrl}/pvs`

  constructor(private http: HttpClient) {}

  getAllPvs(): Observable<Pv[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.get<Pv[]>(this.apiUrl, { headers });
  }

  getPvById(id: number): Observable<Pv> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.get<Pv>(`${this.apiUrl}/${id}`,{ headers })
  }

  getPvsByCitoyen(citoyenId: number): Observable<Pv[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.get<Pv[]>(`${this.apiUrl}/citoyen/${citoyenId}`,{ headers })
  }

  getPvsByPolicier(policierId: number): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/policier/${policierId}`, { headers });
  }

  createPv(pv: Pv): Observable<Pv> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.post<Pv>(this.apiUrl, pv, { headers });
  }

  updatePv(id: number, pv: Pv): Observable<Pv> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.put<Pv>(`${this.apiUrl}/${id}`, pv,{ headers })
  }

  deletePv(id: number): Observable<void> {
     const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers })
  }
}
