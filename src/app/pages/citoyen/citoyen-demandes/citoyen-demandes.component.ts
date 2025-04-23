import { Component, type OnInit } from "@angular/core"
import { NgFor, NgIf, DatePipe, NgClass } from "@angular/common"
import { RouterLink,Router } from "@angular/router"
import { DemandeService } from "../../../services/demande.service"
import { AuthService } from "../../../services/auth.service"
import { Demande } from "../../../models/demande.model"

@Component({
  selector: "app-citoyen-demandes",
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, NgClass],
  template: `
    <div class="demandes-container">
      <div class="header">
        <h1>Mes demandes</h1>
        <a routerLink="/citoyen/nouvelle-demande" class="new-button">Nouvelle demande</a>
      </div>

      <div class="demandes-list" *ngIf="demandes.length > 0; else noDemandes">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let demande of demandes">
              <td>{{ demande.typeDemande }}</td>
              <td>{{ demande.dateCreation | date:'dd/MM/yyyy' }}</td>
              <td>
                <span class="status" [ngClass]="getStatusClass(demande.etat)">
                  {{ getStatusLabel(demande.etat) }}
                </span>
              </td>
              <td>
                <button class="action-button">Détails</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noDemandes>
        <div class="no-data">
          <p>Vous n'avez pas encore de demandes.</p>
          <a routerLink="/citoyen/nouvelle-demande" class="action-button">Créer une demande</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
    .demandes-container {
      padding: 1.5rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .new-button {
      padding: 0.75rem 1.5rem;
      background-color: #3f51b5;
      color: white;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
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
    .action-button {
      padding: 0.5rem 1rem;
      background-color: #f5f5f5;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }
    .no-data {
      text-align: center;
      padding: 3rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .no-data p {
      margin-bottom: 1.5rem;
      color: #666;
    }
    .no-data .action-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #3f51b5;
      color: white;
      text-decoration: none;
    }
    `,
  ],
})
export class CitoyenDemandesComponent implements OnInit {
  demandes: Demande[] = []

  constructor(
    private demandeService: DemandeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUser()?.id;
    const token = localStorage.getItem("auth_token");
    console.log("Token actuel :", token);
    if (!userId || !token) {
      console.error("Authentification requise. Redirection...");
      this.router.navigate(["/login"]);
      return;
    }

    this.demandeService.getDemandesByCitoyen(userId).subscribe({
      next: (demandes) => {
        this.demandes = demandes;
      },
      error: (error) => {
        if (error.status === 401) {
          console.error("Accès refusé. Redirection vers la connexion...");
          this.router.navigate(["/login"]);
        }
      }
    });
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
