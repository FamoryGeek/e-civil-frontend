import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { NgIf } from "@angular/common"
import { UserService } from "../../../services/user.service"
import { Policier } from "../../../models/utilisateur.model"

@Component({
  selector: "app-add-policier",
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div class="add-user-container">
      <div class="header">
        <h1>Ajouter un policier</h1>
        <a routerLink="/admin/users" class="btn btn-secondary">Retour à la liste</a>
      </div>

      <div class="form-container">
        <form (ngSubmit)="onSubmit()" #policierForm="ngForm">
          <div class="form-group">
            <label for="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              [(ngModel)]="policier.nom"
              required
              #nom="ngModel"
              class="form-control"
            />
            <div class="invalid-feedback" *ngIf="nom.invalid && (nom.dirty || nom.touched)">
              <span *ngIf="nom.errors?.['required']">Le nom est requis</span>
            </div>
          </div>

          <div class="form-group">
            <label for="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              [(ngModel)]="policier.prenom"
              required
              #prenom="ngModel"
              class="form-control"
            />
            <div class="invalid-feedback" *ngIf="prenom.invalid && (prenom.dirty || prenom.touched)">
              <span *ngIf="prenom.errors?.['required']">Le prénom est requis</span>
            </div>
          </div>

          <div class="form-group">
            <label for="arrondissement">Arrondissement</label>
            <input
              type="text"
              id="arrondissement"
              name="arrondissement"
              [(ngModel)]="policier.arrondissement"
              required
              #arrondissement="ngModel"
              class="form-control"
            />
            <div class="invalid-feedback" *ngIf="arrondissement.invalid && (arrondissement.dirty || arrondissement.touched)">
              <span *ngIf="arrondissement.errors?.['required']">L'arrondissement est requis</span>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="policier.email"
              required
              email
              #email="ngModel"
              class="form-control"
            />
            <div class="invalid-feedback" *ngIf="email.invalid && (email.dirty || email.touched)">
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
              [(ngModel)]="policier.password"
              required
              minlength="6"
              #password="ngModel"
              class="form-control"
            />
            <div class="invalid-feedback" *ngIf="password.invalid && (password.dirty || password.touched)">
              <span *ngIf="password.errors?.['required']">Le mot de passe est requis</span>
              <span *ngIf="password.errors?.['minlength']">Le mot de passe doit contenir au moins 6 caractères</span>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="cancel()">Annuler</button>
            <button type="submit" class="btn btn-primary" [disabled]="policierForm.invalid || isSubmitting">
              {{ isSubmitting ? 'Création en cours...' : 'Créer le policier' }}
            </button>
          </div>

          <div class="alert alert-danger" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <div class="alert alert-success" *ngIf="successMessage">
            {{ successMessage }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
    .add-user-container {
      padding: 1.5rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .form-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 2rem;
      max-width: 600px;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--gray-700);
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--gray-300);
      border-radius: 0.375rem;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    .form-control:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
    .form-control.ng-invalid.ng-touched {
      border-color: var(--danger);
    }
    .invalid-feedback {
      color: var(--danger);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
    }
    .btn-primary {
      background-color: var(--primary);
      color: white;
    }
    .btn-primary:hover {
      background-color: var(--primary-dark);
    }
    .btn-primary:disabled {
      background-color: var(--gray-400);
      cursor: not-allowed;
    }
    .btn-secondary {
      background-color: var(--gray-100);
      color: var(--gray-800);
      text-decoration: none;
    }
    .btn-secondary:hover {
      background-color: var(--gray-200);
    }
    .alert {
      padding: 1rem;
      border-radius: 0.375rem;
      margin-top: 1.5rem;
    }
    .alert-danger {
      background-color: #fee2e2;
      color: #b91c1c;
    }
    .alert-success {
      background-color: #d1fae5;
      color: #065f46;
    }
    `,
  ],
})
export class AddPolicierComponent {
  policier: Policier = new Policier()
  isSubmitting = false
  errorMessage = ""
  successMessage = ""

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.isSubmitting = true
    this.errorMessage = ""
    this.successMessage = ""

    this.userService.createPolicier(this.policier).subscribe({
      next: () => {
        this.successMessage = "Le policier a été créé avec succès."
        this.isSubmitting = false
        this.policier = new Policier() // Réinitialiser le formulaire
        setTimeout(() => {
          this.router.navigate(["/admin/users"])
        }, 2000)
      },
      error: (error) => {
        this.errorMessage = "Une erreur est survenue lors de la création du policier."
        this.isSubmitting = false
        console.error("Erreur lors de la création du policier", error)
      },
    })
  }

  cancel(): void {
    this.router.navigate(["/admin/users"])
  }
}
