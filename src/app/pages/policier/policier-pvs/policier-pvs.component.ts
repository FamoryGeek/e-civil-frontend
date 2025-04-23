import { Component, type OnInit } from "@angular/core"
import { NgFor, NgIf, DatePipe } from "@angular/common"
import { RouterLink } from "@angular/router"
import { PvService } from "../../../services/pv.service"
import { AuthService } from "../../../services/auth.service"
import { Pv } from "../../../models/pv.model"

@Component({
  selector: "app-policier-pvs",
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink],
  template: `
    <div class="pvs-container">
      <div class="header">
        <h1>Mes procès-verbaux</h1>
        <a routerLink="/policier/nouveau-pv" class="new-button">Nouveau PV</a>
      </div>

      <div class="pvs-list" *ngIf="pvs.length > 0; else noPvs">
        <table>
          <thead>
            <tr>
              <th>Libellé</th>
              <th>Source</th>
              <th>Date</th>
              <th>Citoyen</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let pv of pvs">
              <td>{{ pv.libelle }}</td>
              <td>{{ pv.source }}</td>
              <td>{{ pv.dateCreation | date:'dd/MM/yyyy' }}</td>
              <td>{{ getCitoyenName(pv) }}</td>
              <td>
                <button class="action-button">Détails</button>
                <button class="action-button delete" (click)="deletePv(pv)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noPvs>
        <div class="no-data">
          <p>Vous n'avez pas encore créé de procès-verbaux.</p>
          <a routerLink="/policier/nouveau-pv" class="action-button">Créer un PV</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
    .pvs-container {
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
    .pvs-list {
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
    .action-button {
      padding: 0.5rem 1rem;
      background-color: #f5f5f5;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      margin-right: 0.5rem;
    }
    .action-button.delete {
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
export class PolicierPvsComponent implements OnInit {
  pvs: Pv[] = []

  constructor(
    private pvService: PvService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadPvs()
  }

  loadPvs(): void {
    const userId = this.authService.getCurrentUser()?.id
    if (userId) {
      this.pvService.getPvsByPolicier(userId).subscribe((pvs) => {
        this.pvs = pvs
      })
    }
  }

  deletePv(pv: Pv): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce PV ?")) {
      this.pvService.deletePv(pv.id).subscribe({
        next: () => {
          this.loadPvs()
        },
        error: (error) => {
          console.error("Erreur lors de la suppression du PV", error)
        },
      })
    }
  }

  getCitoyenName(pv: Pv): string {
    if (pv.citoyen) {
      return `${pv.citoyen.prenom} ${pv.citoyen.nom}`
    }
    return "Inconnu"
  }
}
