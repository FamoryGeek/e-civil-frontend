import { Injectable } from "@angular/core"
import { HttpClient,HttpHeaders  } from "@angular/common/http"
import { Observable } from "rxjs"
import { Router } from "@angular/router";
import { environment } from "../../environments/environment"
import { Demande } from "../models/demande.model"

@Injectable({
  providedIn: "root",
})
export class DemandeService {
  private apiUrl = `${environment.apiUrl}/demandes`

  constructor(private http: HttpClient,private router: Router) {}

  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl)
  }

  getDemandeById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/${id}`)
  }

  getDemandesByCitoyen(citoyenId: number): Observable<Demande[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.get<Demande[]>(`${this.apiUrl}/${citoyenId}`, { headers });
  }


  createDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, demande)
  }

  updateDemande(id: number, demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}`, demande)
  }

  approveDemande(id: number, procureurId: number): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}/approve`, { procureurId })
  }

  rejectDemande(id: number, procureurId: number, reason: string): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}/reject`, { procureurId, reason })
  }

  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
