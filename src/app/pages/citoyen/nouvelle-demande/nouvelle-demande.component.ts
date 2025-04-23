import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { NgIf } from "@angular/common"
import { DemandeService } from "../../../services/demande.service"
import { AuthService } from "../../../services/auth.service"
import { Demande } from "../../../models/demande.model"
import { Citoyen } from "../../../models/utilisateur.model"

@Component({
  selector: "app-nouvelle-demande",
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="nouvelle-demande-container">
      <h1>Nouvelle demande</h1>

      <div class="form-container">
        <form (ngSubmit)="onSubmit()" #demandeForm="ngForm">
          <div class="form-group">
            <label for="typeDemande">Type de demande</label>
            <select
              id="typeDemande"
              name="typeDemande"
              [(ngModel)]="demande.typeDemande"
              required
              #typeDemande="ngModel"
            >
              <option value="">Sélectionnez un type</option>
              <option value="EXTRAIT_NAISSANCE">Extrait de naissance</option>
              <option value="CERTIFICAT_RESIDENCE">Certificat de résidence</option>
              <option value="CARTE_IDENTITE">Carte d'identité</option>
            </select>
            <div class="error-message" *ngIf="typeDemande.invalid && (typeDemande.dirty || typeDemande.touched)">
              <span *ngIf="typeDemande.errors?.['required']">Veuillez sélectionner un type de demande</span>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-button" (click)="cancel()">Annuler</button>
            <button type="submit" [disabled]="demandeForm.invalid || isSubmitting">
              {{ isSubmitting ? 'Envoi en cours...' : 'Soumettre la demande' }}
            </button>
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
    .nouvelle-demande-container {
      padding: 1.5rem;
    }
    h1 {
      margin-bottom: 2rem;
    }
    .form-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    }
    select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      background-color: white;
    }
    select.ng-invalid.ng-touched {
      border-color: #f44336;
    }
    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    button[type="submit"] {
      background-color: #3f51b5;
      color: white;
    }
    button[type="submit"]:disabled {
      background-color: #9fa8da;
      cursor: not-allowed;
    }
    .cancel-button {
      background-color: #f5f5f5;
      color: #333;
    }
    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    `,
  ],
})
export class NouvelleDemandeComponent {
  demande: Demande = new Demande()
  isSubmitting = false
  errorMessage = ""

  constructor(
    private demandeService: DemandeService,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.isSubmitting = true
    this.errorMessage = ""

    const currentUser = this.authService.getCurrentUser()
    if (currentUser) {
      this.demande.citoyen = currentUser as Citoyen;
      this.demande.etat = "EN_ATTENTE"

      this.demandeService.createDemande(this.demande).subscribe({
        next: () => {
          this.router.navigate(["/citoyen/demandes"])
        },
        error: (error) => {
          this.errorMessage = "Une erreur est survenue lors de la création de la demande"
          this.isSubmitting = false
          console.error("Erreur lors de la création de la demande", error)
        },
      })
    } else {
      this.errorMessage = "Vous devez être connecté pour soumettre une demande"
      this.isSubmitting = false
    }
  }

  cancel(): void {
    this.router.navigate(["/citoyen/demandes"])
  }
}
