import { Injectable } from "@angular/core"
import { HttpClient,HttpHeaders  } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import { Citoyen, Maire, Procureur, Policier, UserRole } from "../models/utilisateur.model"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }


  getUserById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  getUsersByRole(role: UserRole): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/role/${role}`)
  }

  createCitoyen(citoyen: Citoyen): Observable<Citoyen> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.post<Citoyen>(`${this.apiUrl}/citoyen`, citoyen)
  }

  createMaire(maire: Maire): Observable<Maire> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.post<Maire>(`${this.apiUrl}/maire`, maire)
  }

  createProcureur(procureur: Procureur): Observable<Procureur> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.post<Procureur>(`${this.apiUrl}/procureur`, procureur)
  }

  createPolicier(policier: Policier): Observable<Policier> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.post<Policier>(`${this.apiUrl}/policier`, policier)
  }

  updateUser(id: number, user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, user)
  }

  deleteUser(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
