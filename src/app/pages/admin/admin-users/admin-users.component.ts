import { Component, type OnInit } from "@angular/core"
import { RouterLink,Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { FormsModule } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service"
import { UserRole } from "../../../models/utilisateur.model"

@Component({
  selector: "app-admin-users",
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <div class="admin-users">
      <div class="header">
        <h1>Gestion des utilisateurs</h1>
        <div class="header-actions">
          <a routerLink="/admin/dashboard" class="btn btn-secondary">Retour au tableau de bord</a>
          <div class="dropdown">
            <button class="btn btn-primary">Ajouter un utilisateur</button>
            <div class="dropdown-content">
              <a routerLink="/admin/add-citoyen">Citoyen</a>
              <a routerLink="/admin/add-maire">Maire</a>
              <a routerLink="/admin/add-procureur">Procureur</a>
              <a routerLink="/admin/add-policier">Policier</a>
            </div>
          </div>
        </div>
      </div>

      <div class="filters">
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'ALL'"
          (click)="setFilter('ALL')"
        >
          Tous
        </button>
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'CITOYEN'"
          (click)="setFilter('CITOYEN')"
        >
          Citoyens
        </button>
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'MAIRE'"
          (click)="setFilter('MAIRE')"
        >
          Maires
        </button>
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'PROCUREUR'"
          (click)="setFilter('PROCUREUR')"
        >
          Procureurs
        </button>
        <button
          class="filter-btn"
          [class.active]="activeFilter === 'POLICIER'"
          (click)="setFilter('POLICIER')"
        >
          Policiers
        </button>
      </div>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          [(ngModel)]="searchTerm"
          (input)="filterUsers()"
        />
      </div>

      <div class="users-table" *ngIf="filteredUsers.length > 0; else noUsers">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of filteredUsers">
              <td>{{ user.id }}</td>
              <td>{{ user.nom }}</td>
              <td>{{ user.prenom }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="badge" [ngClass]="getRoleBadgeClass(user.role)">
                  {{ getRoleLabel(user.role) }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button class="action-btn edit" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn delete" title="Supprimer" (click)="deleteUser(user.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noUsers>
        <div class="no-data">
          <p>Aucun utilisateur trouvé.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
    .admin-users {
      padding: 1.5rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .header-actions {
      display: flex;
      gap: 1rem;
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
    .users-table {
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
    .badge-citoyen {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .badge-maire {
      background-color: #e3f2fd;
      color: #1565c0;
    }
    .badge-procureur {
      background-color: #fff8e1;
      color: #f57f17;
    }
    .badge-policier {
      background-color: #e8eaf6;
      color: #3949ab;
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
    .action-btn.edit {
      background-color: var(--gray-100);
      color: var(--gray-700);
    }
    .action-btn.edit:hover {
      background-color: var(--gray-200);
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
    .dropdown {
      position: relative;
      display: inline-block;
    }
    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background-color: white;
      min-width: 160px;
      box-shadow: var(--shadow-md);
      z-index: 1;
      border-radius: 0.375rem;
      overflow: hidden;
    }
    .dropdown-content a {
      color: var(--gray-800);
      padding: 0.75rem 1rem;
      text-decoration: none;
      display: block;
      transition: all 0.2s ease;
    }
    .dropdown-content a:hover {
      background-color: var(--gray-100);
    }
    .dropdown:hover .dropdown-content {
      display: block;
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
export class AdminUsersComponent implements OnInit {
  users: any[] = []
  filteredUsers: any[] = []
  activeFilter = "ALL"
  searchTerm = ""

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem("auth_token");
    console.log("Token actuel :", token);
    if (!token) {
      console.error("Authentification requise. Redirection...");
      this.router.navigate(["/login"]);
      return;
    }
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        if (error.status === 401) {
          console.error("Unauthorized access. Redirecting to login...");
          this.authService.logout();
          this.router.navigate(["/login"]);
        } else {
          console.error("Error fetching users:", error);
        }
      }
    });
  }


  setFilter(filter: string): void {
    this.activeFilter = filter
    this.filterUsers()
  }

  filterUsers(): void {
    // Filtrer par rôle
    let filtered = this.users
    if (this.activeFilter !== "ALL") {
      filtered = this.users.filter((user) => user.role === this.activeFilter)
    }

    // Filtrer par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.nom?.toLowerCase().includes(term) ||
          user.prenom?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term),
      )
    }

    this.filteredUsers = filtered
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case UserRole.CITOYEN:
        return "badge-citoyen"
      case UserRole.MAIRE:
        return "badge-maire"
      case UserRole.PROCUREUR:
        return "badge-procureur"
      case UserRole.POLICIER:
        return "badge-policier"
      default:
        return ""
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case UserRole.CITOYEN:
        return "Citoyen"
      case UserRole.MAIRE:
        return "Maire"
      case UserRole.PROCUREUR:
        return "Procureur"
      case UserRole.POLICIER:
        return "Policier"
      case UserRole.ADMIN:
        return "Admin"
      default:
        return role
    }
  }

  deleteUser(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers()
      })
    }
  }
}
