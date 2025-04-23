import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { NgIf } from "@angular/common"
import { AuthService } from "../../services/auth.service"
import { UserRole } from "../../models/utilisateur.model"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>E-Civil</h1>
        <h2>Connexion</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="credentials.email"
              required
              email
              #email="ngModel"
            />
            <div class="error-message" *ngIf="email.invalid && (email.dirty || email.touched)">
              <span *ngIf="email.errors?.['required']">L'email est requis</span>
              <span *ngIf="email.errors?.['email']">Format d'email invalide</span>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="credentials.password"
              required
              minlength="6"
              #password="ngModel"
            />
            <div class="error-message" *ngIf="password.invalid && (password.dirty || password.touched)">
              <span *ngIf="password.errors?.['required']">Le mot de passe est requis</span>
              <span *ngIf="password.errors?.['minlength']">Le mot de passe doit contenir au moins 6 caractères</span>
            </div>
          </div>
          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
          <button type="submit" [disabled]="loginForm.invalid || isLoading">
            {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
        </form>
        <div class="register-link">
          <p>Vous n'avez pas de compte ? <a routerLink="/register">S'inscrire</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .login-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      width: 100%;
      max-width: 400px;
    }
    h1 {
      text-align: center;
      color: #3f51b5;
      margin-bottom: 0.5rem;
    }
    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    input.ng-invalid.ng-touched {
      border-color: #f44336;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
    }
    button:disabled {
      background-color: #9fa8da;
      cursor: not-allowed;
    }
    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    .register-link {
      text-align: center;
      margin-top: 1.5rem;
    }
    .register-link a {
      color: #3f51b5;
      text-decoration: none;
    }
    `,
  ],
})
export class LoginComponent {
  credentials = {
    email: "",
    password: "",
  }
  isLoading = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.isLoading = true
    this.errorMessage = ""

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Rediriger en fonction du rôle
        switch (response.role) {
          case UserRole.CITOYEN:
            this.router.navigate(["/citoyen/demandes"])
            break
          case UserRole.MAIRE:
            this.router.navigate(["/maire/demandes"])
            break
          case UserRole.PROCUREUR:
            this.router.navigate(["/procureur/demandes"])
            break
          case UserRole.POLICIER:
            this.router.navigate(["/policier/pvs"])
            break
          default:
            this.router.navigate(["/dashboard"])
        }
      },
      error: (error) => {
        this.errorMessage = "Email ou mot de passe incorrect"
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      },
    })
  }
}
