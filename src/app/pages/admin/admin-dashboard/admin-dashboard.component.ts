import { Component, OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"
import { CommonModule  } from "@angular/common"
import { AuthService } from "../../../services/auth.service"

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="admin-dashboard">
      <h1>Tableau de bord administrateur</h1>

      <div class="welcome-message">
        <h2>Bienvenue, {{ adminName }} !</h2>
        <p>Vous avez accès à toutes les fonctionnalités du système.</p>
      </div>

      <div class="admin-cards">
        <div class="card">
          <h3>Gestion des utilisateurs</h3>
          <div class="card-content">
            <p>Ajouter et gérer les différents utilisateurs du système.</p>
            <div class="card-actions">
              <a routerLink="/admin/users" class="btn btn-primary">Gérer les utilisateurs</a>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Demandes</h3>
          <div class="card-content">
            <p>Consulter et gérer toutes les demandes.</p>
            <div class="card-actions">
              <a routerLink="/admin/demandes" class="btn btn-primary">Voir les demandes</a>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Procès-verbaux</h3>
          <div class="card-content">
            <p>Consulter et gérer tous les procès-verbaux.</p>
            <div class="card-actions">
              <a routerLink="/admin/pvs" class="btn btn-primary">Voir les PVs</a>
            </div>
          </div>
        </div>
      </div>

      <div class="admin-quick-actions">
        <h3>Actions rapides</h3>
        <div class="quick-actions-grid">
          <a routerLink="/admin/add-citoyen" class="action-card">
            <div class="action-icon">👤</div>
            <div class="action-title">Ajouter un citoyen</div>
          </a>
          <a routerLink="/admin/add-maire" class="action-card">
            <div class="action-icon">🏛️</div>
            <div class="action-title">Ajouter un maire</div>
          </a>
          <a routerLink="/admin/add-procureur" class="action-card">
            <div class="action-icon">⚖️</div>
            <div class="action-title">Ajouter un procureur</div>
          </a>
          <a routerLink="/admin/add-policier" class="action-card">
            <div class="action-icon">👮</div>
            <div class="action-title">Ajouter un policier</div>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .admin-dashboard {
      padding: 1.5rem;
    }
    .welcome-message {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow);
    }
    .admin-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: var(--shadow);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }
    .card h3 {
      color: var(--primary);
      margin-bottom: 1rem;
    }
    .card-content {
      margin-bottom: 1.5rem;
    }
    .card-actions {
      display: flex;
      justify-content: flex-end;
    }
    .admin-quick-actions {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: var(--shadow);
    }
    .admin-quick-actions h3 {
      color: var(--primary);
      margin-bottom: 1.5rem;
    }
    .quick-actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .action-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      background-color: var(--gray-50);
      border-radius: 8px;
      text-decoration: none;
      color: var(--gray-800);
      transition: all 0.2s ease;
    }
    .action-card:hover {
      background-color: var(--primary);
      color: white;
      transform: translateY(-3px);
    }
    .action-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    .action-title {
      font-weight: 500;
      text-align: center;
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
    .btn-primary {
      background-color: var(--primary);
      color: white;
    }
    .btn-primary:hover {
      background-color: var(--primary-dark);
    }
    `,
  ],
})
export class AdminDashboardComponent implements OnInit {
  adminName = ""

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser()
    if (currentUser && "nom" in currentUser && "prenom" in currentUser) {
      this.adminName = `${(currentUser as any).prenom} ${(currentUser as any).nom}`
    } else if (currentUser) {
      this.adminName = currentUser.email
    }
  }
}
