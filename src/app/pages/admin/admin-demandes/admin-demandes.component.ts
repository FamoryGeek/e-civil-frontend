import { Component, OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"
import { FormsModule } from '@angular/forms';
import { DemandeService } from "../../../services/demande.service"
import { Demande } from "../../../models/demande.model"

@Component({
  selector: "app-admin-demandes",
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule,],
  template: `
    <div class="admin-demandes">
      <div class="header">
        <h1>Gestion des demandes</h1>
        <a routerLink="/admin/dashboard" class="btn btn-secondary">Retour au tableau de bord</a>
      </div>

      <div class="filters">
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'ALL'"
          (click)="setFilter('ALL')"
        >
          Toutes
        </button>
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'EN_ATTENTE'"
          (click)="setFilter('EN_ATTENTE')"
        >
          En attente
        </button>
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'APPROUVEE'"
          (click)="setFilter('APPROUVEE')"
        >
          Approuvées
        </button>
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'REJETEE'"
          (click)="setFilter('REJETEE')"
        >
          Rejetées
        </button>
      </div>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Rechercher une demande..."
          [(ngModel)]="searchTerm"
          (input)="filterDemandes()"
        />
      </div>

      <div class="demandes-table" *ngIf="filteredDemandes.length > 0; else noDemandes">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Citoyen</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let demande of filteredDemandes">
              <td>{{ demande.id }}</td>
              <td>{{ demande.typeDemande }}</td>
              <td>{{ demande.dateCreation | date:'dd/MM/yyyy' }}</td>
              <td>{{ getCitoyenName(demande) }}</td>
              <td>
                <span class="badge" [ngClass]="getStatusClass(demande.etat)">
                  {{ getStatusLabel(demande.etat) }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button class="action-btn view" title="Voir détails">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="action-btn approve" *ngIf="demande.etat === 'EN_ATTENTE'" title="Approuver" (click)="approveDemande(demande)">
                    <i class="fas fa-check"></i>
                  </button>
                  <button class="action-btn reject" *ngIf="demande.etat === 'EN_ATTENTE'" title="Rejeter" (click)="rejectDemande(demande)">
                    <i class="fas fa-times"></i>
                  </button>
                  <button class="action-btn delete" title="Supprimer" (click)="deleteDemande(demande.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noDemandes>
        <div class="no-data">
          <p>Aucune demande trouvée.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
    .admin-demandes {
      padding: 1.5rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .filters {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .filter-btn {
      padding: 0.5rem 1rem;
      background-color: var(--gray-100);
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .filter-btn.active {
      background-color: var(--primary);
      color: white;
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
    .demandes-table {
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
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .badge-pending {
      background-color: #fff8e1;
      color: #f57f17;
    }
    .badge-approved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .badge-rejected {
      background-color: #ffebee;
      color: #c62828;
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
    .action-btn.approve {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .action-btn.approve:hover {
      background-color: #c8e6c9;
    }
    .action-btn.reject {
      background-color: #ffebee;
      color: #c62828;
    }
    .action-btn.reject:hover {
      background-color: #ffcdd2;
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
export class AdminDemandesComponent implements OnInit {
  demandes: Demande[] = []
  filteredDemandes: Demande[] = []
  activeFilter = "ALL"
  searchTerm = ""

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.loadDemandes()
  }

  loadDemandes(): void {
    this.demandeService.getAllDemandes().subscribe((demandes) => {
      this.demandes = demandes
      this.filterDemandes()
    })
  }

  setFilter(filter: string): void {
    this.activeFilter = filter
    this.filterDemandes()
  }

  filterDemandes(): void {
    // Filtrer par état
    let filtered = this.demandes
    if (this.activeFilter !== "ALL") {
      filtered = this.demandes.filter((demande) => demande.etat === this.activeFilter)
    }

    // Filtrer par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (demande) =>
          demande.typeDemande?.toLowerCase().includes(term) ||
          this.getCitoyenName(demande).toLowerCase().includes(term),
      )
    }

    this.filteredDemandes = filtered
  }

  getStatusClass(etat: string): string {
    switch (etat) {
      case "EN_ATTENTE":
        return "badge-pending"
      case "APPROUVEE":
        return "badge-approved"
      case "REJETEE":
        return "badge-rejected"
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

  getCitoyenName(demande: Demande): string {
    if (demande.citoyen) {
      return `${demande.citoyen.prenom} ${demande.citoyen.nom}`
    }
    return "Inconnu"
  }

  approveDemande(demande: Demande): void {
    if (confirm("Êtes-vous sûr de vouloir approuver cette demande ?")) {
      // Utiliser l'ID de l'admin connecté
      const adminId = 1 // À remplacer par l'ID réel de l'admin
      this.demandeService.approveDemande(demande.id, adminId).subscribe(() => {
        this.loadDemandes()
      })
    }
  }

  rejectDemande(demande: Demande): void {
    const reason = prompt("Veuillez entrer la raison du rejet:")
    if (reason) {
      // Utiliser l'ID de l'admin connecté
      const adminId = 1 // À remplacer par l'ID réel de l'admin
      this.demandeService.rejectDemande(demande.id, adminId, reason).subscribe(() => {
        this.loadDemandes()
      })
    }
  }

  deleteDemande(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      this.demandeService.deleteDemande(id).subscribe(() => {
        this.loadDemandes()
      })
    }
  }
}
