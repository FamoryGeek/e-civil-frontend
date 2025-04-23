import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { NgIf } from "@angular/common"
import { PvService } from "../../../services/pv.service"
import { AuthService } from "../../../services/auth.service"
import { Pv } from "../../../models/pv.model"
import { Policier } from "../../../models/utilisateur.model"

@Component({
  selector: "app-nouveau-pv",
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="nouveau-pv-container">
      <h1>Nouveau procès-verbal</h1>

      <div class="form-container">
        <form (ngSubmit)="onSubmit()" #pvForm="ngForm">
          <div class="form-group">
            <label for="libelle">Libellé</label>
            <input
              type="text"
              id="libelle"
              name="libelle"
              [(ngModel)]="pv.libelle"
              required
              #libelle="ngModel"
            />
            <div class="error-message" *ngIf="libelle.invalid && (libelle.dirty || libelle.touched)">
              <span *ngIf="libelle.errors?.['required']">Le libellé est requis</span>
            </div>
          </div>

          <div class="form-group">
            <label for="source">Source</label>
            <input
              type="text"
              id="source"
              name="source"
              [(ngModel)]="pv.source"
              required
              #source="ngModel"
            />
            <div class="error-message" *ngIf="source.invalid && (source.dirty || source.touched)">
              <span *ngIf="source.errors?.['required']">La source est requise</span>
            </div>
          </div>

          <div class="form-group">
            <label for="citoyenId">ID du citoyen concerné</label>
            <input
              type="number"
              id="citoyenId"
              name="citoyenId"
              [(ngModel)]="citoyenId"
              required
              #citoyenIdInput="ngModel"
            />
            <div class="error-message" *ngIf="citoyenIdInput.invalid && (citoyenIdInput.dirty || citoyenIdInput.touched)">
              <span *ngIf="citoyenIdInput.errors?.['required']">L'ID du citoyen est requis</span>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-button" (click)="cancel()">Annuler</button>
            <button type="submit" [disabled]="pvForm.invalid || isSubmitting">
              {{ isSubmitting ? 'Envoi en cours...' : 'Enregistrer le PV' }}
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
    .nouveau-pv-container {
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
export class NouveauPvComponent {
  pv: Pv = new Pv()
  citoyenId: number | null = null
  isSubmitting = false
  errorMessage = ""

  constructor(
    private pvService: PvService,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {

    this.isSubmitting = true
    this.errorMessage = ""

    const currentUser = this.authService.getCurrentUser()
    if (currentUser && this.citoyenId) {
      this.pv.policier = currentUser as Policier;
      this.pv.citoyen = { id: this.citoyenId } as any

      this.pvService.createPv(this.pv).subscribe({
        next: () => {
          this.router.navigate(["/policier/pvs"])
        },
        error: (error) => {
          this.errorMessage = "Une erreur est survenue lors de la création du PV"
          this.isSubmitting = false
          console.error("Erreur lors de la création du PV", error)
        },
      })
    } else {
      this.errorMessage = "Informations manquantes pour créer le PV"
      this.isSubmitting = false
    }
  }

  cancel(): void {
    this.router.navigate(["/policier/pvs"])
  }
}
