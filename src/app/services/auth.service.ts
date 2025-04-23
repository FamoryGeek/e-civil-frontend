import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Utilisateur, UserRole, Citoyen, Maire, Procureur, Policier } from "../models/utilisateur.model";

interface LoginResponse {
  token: string;
  user: any;
  role: UserRole;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "current_user";
  private readonly ROLE_KEY = "user_role";
  private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadCurrentUser();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadCurrentUser(): void {
    if (!this.isBrowser()) return;

    const userJson = localStorage.getItem(this.USER_KEY);
    const role = localStorage.getItem(this.ROLE_KEY);

    if (userJson && role) {
      const userData = JSON.parse(userJson);
      let user: Utilisateur;

      switch (role) {
        case UserRole.CITOYEN:
          user = Object.assign(new Citoyen(), userData);
          break;
        case UserRole.MAIRE:
          user = Object.assign(new Maire(), userData);
          break;
        case UserRole.PROCUREUR:
          user = Object.assign(new Procureur(), userData);
          break;
        case UserRole.POLICIER:
          user = Object.assign(new Policier(), userData);
          break;
        default:
          user = Object.assign(new Utilisateur(), userData);
      }

      this.currentUserSubject.next(user);
    }
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (this.isBrowser()) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          localStorage.setItem(this.ROLE_KEY, response.role);
        }

        let user: Utilisateur;
        switch (response.role) {
          case UserRole.CITOYEN:
            user = Object.assign(new Citoyen(), response.user);
            break;
          case UserRole.MAIRE:
            user = Object.assign(new Maire(), response.user);
            break;
          case UserRole.PROCUREUR:
            user = Object.assign(new Procureur(), response.user);
            break;
          case UserRole.POLICIER:
            user = Object.assign(new Policier(), response.user);
            break;
          default:
            user = Object.assign(new Utilisateur(), response.user);
        }

        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        console.error("Login failed", error);
        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.ROLE_KEY);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): UserRole | null {
    const role = this.isBrowser() ? localStorage.getItem(this.ROLE_KEY) : null;
    return role as UserRole | null;
  }

  register(user: Utilisateur, role: UserRole): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    };

    return this.http.post(`${this.apiUrl}/register`, { ...user, role }, { headers }).pipe(
      catchError((error) => {
        console.error("Registration failed", error);
        return throwError(() => error);
      }),
    );
  }

}
