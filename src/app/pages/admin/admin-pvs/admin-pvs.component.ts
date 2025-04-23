import { Component, OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"
import { NgFor, NgIf, DatePipe } from "@angular/common"
import { FormsModule } from '@angular/forms';
import { PvService } from "../../../services/pv.service"
import { Pv } from "../../../models/pv.model"

@Component({
  selector: "app-admin-pvs",
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, DatePipe, FormsModule,],
  template: `
    <div class="admin-pvs">
      <div class="header">
        <h1>Gestion des procès-verbaux</h1>
        <a routerLink="/admin/dashboard" class="btn btn-secondary">Retour au tableau de bord</a>
      </div>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Rechercher un PV..."
          [(ngModel)]="searchTerm"
          (input)="filterPvs()"
        />
      </div>

      <div class="pvs-table" *ngIf="filteredPvs.length > 0; else noPvs">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Libellé</th>
              <th>Source</th>
              <th>Date</th>
              <th>Citoyen</th>
              <th>Policier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let pv of filteredPvs">
              <td>{{ pv.id }}</td>
              <td>{{ pv.libelle }}</td>
              <td>{{ pv.source }}</td>
              <td>{{ pv.dateCreation | date:'dd/MM/yyyy' }}</td>
              <td>{{ getCitoyenName(pv) }}</td>
              <td>{{ getPolicierName(pv) }}</td>
              <td>
                <div class="actions">
                  <button class="action-btn view" title="Voir détails">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="action-btn edit" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn delete" title="Supprimer" (click)="deletePv(pv.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noPvs>
        <div class="no-data">
          <p>Aucun procès-verbal trouvé.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
    .admin-pvs {
      padding: 1.5rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .search-bar {
      margin-bottom: 1.5rem;
    }
    .search-bar input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--gray-300);
      border-radius: 0.375rem;
      font-size: 1rem;
    }
    .pvs-table {
      background-color: white;
      border-radius: 8px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid var(--gray-200);
    }
    th {
      background-color: var(--gray-50);
      font-weight: 600;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    .action-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .action-btn.view {
      background-color: var(--gray-100);
      color: var(--gray-700);
    }
    .action-btn.view:hover {
      background-color: var(--gray-200);
    }
    .action-btn.edit {
      background-color: #e3f2fd;
      color: #1565c0;
    }
    .action-btn.edit:hover {
      background-color: #bbdefb;
    }
    .action-btn.delete {
      background-color: #ffebee;
      color: #c62828;
    }
    .action-btn.delete:hover {
      background-color: #ffcdd2;
    }
    .no-data {
      text-align: center;
      padding: 3rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: var(--shadow);
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .btn-secondary {
      background-color: var(--gray-100);
      color: var(--gray-800);
    }
    .btn-secondary:hover {
      background-color: var(--gray-200);
    }
    `,
  ],
})
export class AdminPvsComponent implements OnInit {
  pvs: Pv[] = []
  filteredPvs: Pv[] = []
  searchTerm = ""

  constructor(private pvService: PvService) {}

  ngOnInit(): void {
    this.loadPvs()
  }

  loadPvs(): void {
    this.pvService.getAllPvs().subscribe((pvs) => {
      this.pvs = pvs
      this.filterPvs()
    })
  }

  filterPvs(): void {
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase()
      this.filteredPvs = this.pvs.filter(
        (pv) =>
          pv.libelle?.toLowerCase().includes(term) ||
          pv.source?.toLowerCase().includes(term) ||
          this.getCitoyenName(pv).toLowerCase().includes(term) ||
          this.getPolicierName(pv).toLowerCase().includes(term),
      )
    } else {
      this.filteredPvs = this.pvs
    }
  }

  getCitoyenName(pv: Pv): string {
    if (pv.citoyen) {
      return `${pv.citoyen.prenom} ${pv.citoyen.nom}`
    }
    return "Inconnu"
  }

  getPolicierName(pv: Pv): string {
    if (pv.policier) {
      return `${pv.policier.prenom} ${pv.policier.nom}`
    }
    return "Inconnu"
  }

  deletePv(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce procès-verbal ?")) {
      this.pvService.deletePv(id).subscribe(() => {
        this.loadPvs()
      })
    }
  }
}
