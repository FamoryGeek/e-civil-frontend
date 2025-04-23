import { Component, type OnInit } from "@angular/core"
import { NgFor, NgIf, DatePipe, NgClass } from "@angular/common"
import { DemandeService } from "../../../services/demande.service"
import { AuthService } from "../../../services/auth.service"
import { Demande } from "../../../models/demande.model"

@Component({
  selector: "app-procureur-demandes",
  standalone: true,
  imports: [NgFor, NgIf, DatePipe,NgClass],
  template: `
    <div class="demandes-container">
      <h1>Demandes à approuver</h1>

      <div class="demandes-list" *ngIf="demandes.length > 0; else noDemandes">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Citoyen</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let demande of demandes">
              <td>{{ demande.typeDemande }}</td>
              <td>{{ demande.dateCreation | date:'dd/MM/yyyy' }}</td>
              <td>{{ getCitoyenName(demande) }}</td>
              <td>
                <span class="status" [ngClass]="getStatusClass(demande.etat)">
                  {{ getStatusLabel(demande.etat) }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="action-button approve" (click)="approveDemande(demande)" *ngIf="demande.etat === 'EN_ATTENTE'">
                    Approuver
                  </button>
                  <button class="action-button reject" (click)="rejectDemande(demande)" *ngIf="demande.etat === 'EN_ATTENTE'">
                    Rejeter
                  </button>
                  <button class="action-button">Détails</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noDemandes>
        <div class="no-data">
          <p>Aucune demande à traiter pour le moment.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
    .demandes-container {
      padding: 1.5rem;
    }
    h1 {
      margin-bottom: 2rem;
    }
    .demandes-list {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
    .status {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .status.pending {
      background-color: #fff8e1;
      color: #ffa000;
    }
    .status.approved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .status.rejected {
      background-color: #ffebee;
      color: #c62828;
    }
    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }
    .action-button {
      padding: 0.5rem 1rem;
      background-color: #f5f5f5;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }
    .action-button.approve {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .action-button.reject {
      background-color: #ffebee;
      color: #c62828;
    }
    .no-data {
      text-align: center;
      padding: 3rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .no-data p {
      color: #666;
    }
    `,
  ],
})
export class ProcureurDemandesComponent implements OnInit {
  demandes: Demande[] = []

  constructor(
    private demandeService: DemandeService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadDemandes()
  }

  loadDemandes(): void {
    this.demandeService.getAllDemandes().subscribe((demandes) => {
      this.demandes = demandes
    })
  }

  approveDemande(demande: Demande): void {
    const procureurId = this.authService.getCurrentUser()?.id
    if (procureurId) {
      this.demandeService.approveDemande(demande.id, procureurId).subscribe({
        next: () => {
          this.loadDemandes()
        },
        error: (error) => {
          console.error("Erreur lors de l'approbation de la demande", error)
        },
      })
    }
  }

  rejectDemande(demande: Demande): void {
    const procureurId = this.authService.getCurrentUser()?.id
    if (procureurId) {
      // Dans une application réelle, vous pourriez ajouter une boîte de dialogue pour saisir la raison
      const reason = "Demande rejetée par le procureur"
      this.demandeService.rejectDemande(demande.id, procureurId, reason).subscribe({
        next: () => {
          this.loadDemandes()
        },
        error: (error) => {
          console.error("Erreur lors du rejet de la demande", error)
        },
      })
    }
  }

  getCitoyenName(demande: Demande): string {
    if (demande.citoyen) {
      return `${demande.citoyen.prenom} ${demande.citoyen.nom}`
    }
    return "Inconnu"
  }

  getStatusClass(etat: string): string {
    switch (etat) {
      case "EN_ATTENTE":
        return "pending"
      case "APPROUVEE":
        return "approved"
      case "REJETEE":
        return "rejected"
      default:
        return ""
    }
  }

  getStatusLabel(etat: string): string {
    switch (etat) {
      case "EN_ATTENTE":
        return "En attente"
      case "APPROUVEE":
        return "Approuvée"
      case "REJETEE":
        return "Rejetée"
      default:
        return etat
    }
  }
}
