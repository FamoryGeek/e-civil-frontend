import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { NgIf } from "@angular/common"
import { AuthService } from "../../services/auth.service"
import { Citoyen, UserRole } from "../../models/utilisateur.model"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h1>E-Civil</h1>
        <h2>Inscription</h2>
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <label for="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              [(ngModel)]="user.nom"
              required
              #nom="ngModel"
            />
            <div class="error-message" *ngIf="nom.invalid && (nom.dirty || nom.touched)">
              <span *ngIf="nom.errors?.['required']">Le nom est requis</span>
            </div>
          </div>

          <div class="form-group">
            <label for="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              [(ngModel)]="user.prenom"
              required
              #prenom="ngModel"
            />
            <div class="error-message" *ngIf="prenom.invalid && (prenom.dirty || prenom.touched)">
              <span *ngIf="prenom.errors?.['required']">Le prénom est requis</span>
            </div>
          </div>

          <div class="form-group">
            <label for="nina">Numéro NINA</label>
            <input
              type="text"
              id="nina"
              name="nina"
              [(ngModel)]="user.nina"
              required
              #nina="ngModel"
            />
            <div class="error-message" *ngIf="nina.invalid && (nina.dirty || nina.touched)">
              <span *ngIf="nina.errors?.['required']">Le numéro NINA est requis</span>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="user.email"
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
              [(ngModel)]="user.password"
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

          <button type="submit" [disabled]="registerForm.invalid || isLoading">
            {{ isLoading ? 'Inscription en cours...' : 'S\'inscrire' }}
          </button>
        </form>

        <div class="login-link">
          <p>Vous avez déjà un compte ? <a routerLink="/login">Se connecter</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 2rem 0;
    }
    .register-card {
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
    .login-link {
      text-align: center;
      margin-top: 1.5rem;
    }
    .login-link a {
      color: #3f51b5;
      text-decoration: none;
    }
    `,
  ],
})
export class RegisterComponent {
  user: Citoyen = new Citoyen()
  isLoading = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.isLoading = true
    this.errorMessage = ""

    this.authService.register(this.user, UserRole.CITOYEN).subscribe({
      next: () => {
        // Rediriger vers la page de connexion après inscription réussie
        this.router.navigate(["/login"], {
          queryParams: { registered: "true" },
        })
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = "Cet email est déjà utilisé"
        } else {
          this.errorMessage = "Une erreur est survenue lors de l'inscription"
        }
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      },
    })
  }
}
