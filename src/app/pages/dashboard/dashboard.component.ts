import { Component, type OnInit } from "@angular/core"
import { CommonModule, NgSwitch, NgSwitchCase } from "@angular/common"
import { RouterLink } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import { DemandeService } from "../../services/demande.service"
import { PvService } from "../../services/pv.service"
import { UserRole } from "../../models/utilisateur.model"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, NgSwitch, NgSwitchCase, RouterLink],
  template: `
    <div class="dashboard">
      <h1>Tableau de bord</h1>

      <div class="welcome-message">
        <h2>Bienvenue, {{ userName }} !</h2>
        <p>Vous êtes connecté en tant que {{ userRoleDisplay }}</p>
      </div>

      <div [ngSwitch]="userRole" class="dashboard-content">
        <!-- Dashboard Citoyen -->
        <ng-container *ngSwitchCase="'CITOYEN'">
          <div class="dashboard-cards">
            <div class="card">
              <h3>Mes demandes</h3>
              <div class="card-content">
                <p class="stat">{{ stats.totalDemandes || 0 }}</p>
                <p>Demandes en cours: {{ stats.demandesEnCours || 0 }}</p>
                <p>Demandes approuvées: {{ stats.demandesApprouvees || 0 }}</p>
              </div>
              <a routerLink="/citoyen/demandes" class="card-link">Voir mes demandes</a>
            </div>

            <div class="card">
              <h3>Mes PVs</h3>
              <div class="card-content">
                <p class="stat">{{ stats.totalPvs || 0 }}</p>
              </div>
              <a routerLink="/citoyen/pvs" class="card-link">Voir mes PVs</a>
            </div>

            <div class="card">
              <h3>Actions rapides</h3>
              <div class="card-content actions">
                <a routerLink="/citoyen/nouvelle-demande" class="action-button">
                  Nouvelle demande
                </a>
                <a routerLink="/citoyen/profile" class="action-button secondary">
                  Modifier mon profil
                </a>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Dashboard Maire -->
        <ng-container *ngSwitchCase="'MAIRE'">
          <div class="dashboard-cards">
            <div class="card">
              <h3>Demandes à traiter</h3>
              <div class="card-content">
                <p class="stat">{{ stats.totalDemandes || 0 }}</p>
                <p>En attente: {{ stats.demandesEnCours || 0 }}</p>
              </div>
              <a routerLink="/maire/demandes" class="card-link">Gérer les demandes</a>
            </div>

            <div class="card">
              <h3>Actions rapides</h3>
              <div class="card-content actions">
                <a routerLink="/maire/profile" class="action-button secondary">
                  Modifier mon profil
                </a>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Dashboard Procureur -->
        <ng-container *ngSwitchCase="'PROCUREUR'">
          <div class="dashboard-cards">
            <div class="card">
              <h3>Demandes à approuver</h3>
              <div class="card-content">
                <p class="stat">{{ stats.totalDemandes || 0 }}</p>
                <p>En attente: {{ stats.demandesEnCours || 0 }}</p>
              </div>
              <a routerLink="/procureur/demandes" class="card-link">Gérer les demandes</a>
            </div>

            <div class="card">
              <h3>PVs</h3>
              <div class="card-content">
                <p class="stat">{{ stats.totalPvs || 0 }}</p>
              </div>
              <a routerLink="/procureur/pvs" class="card-link">Consulter les PVs</a>
            </div>

            <div class="card">
              <h3>Actions rapides</h3>
              <div class="card-content actions">
                <a routerLink="/procureur/profile" class="action-button secondary">
                  Modifier mon profil
                </a>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Dashboard Policier -->
        <ng-container *ngSwitchCase="'POLICIER'">
          <div class="dashboard-cards">
            <div class="card">
              <h3>Mes PVs</h3>
              <div class="card-content">
                <p class="stat">{{ stats.totalPvs || 0 }}</p>
              </div>
              <a routerLink="/policier/pvs" class="card-link">Gérer les PVs</a>
            </div>

            <div class="card">
              <h3>Actions rapides</h3>
              <div class="card-content actions">
                <a routerLink="/policier/nouveau-pv" class="action-button">
                  Nouveau PV
                </a>
                <a routerLink="/policier/profile" class="action-button secondary">
                  Modifier mon profil
                </a>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
    .dashboard {
      padding: 1.5rem;
    }
    .welcome-message {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    .welcome-message h2 {
      margin-bottom: 0.5rem;
      color: #3f51b5;
    }
    .dashboard-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }
    .card h3 {
      margin-bottom: 1rem;
      color: #3f51b5;
      font-size: 1.25rem;
    }
    .card-content {
      flex: 1;
      margin-bottom: 1rem;
    }
    .stat {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #3f51b5;
    }
    .card-link {
      display: inline-block;
      color: #3f51b5;
      text-decoration: none;
      font-weight: 500;
    }
    .card-link:hover {
      text-decoration: underline;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .action-button {
      display: inline-block;
      padding: 0.75rem 1rem;
      background-color: #3f51b5;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      text-align: center;
      font-weight: 500;
    }
    .action-button.secondary {
      background-color: #f5f5f5;
      color: #333;
    }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  userRole: UserRole | null = null
  userName = ""
  userRoleDisplay = ""
  stats: any = {
    totalDemandes: 0,
    demandesEnCours: 0,
    demandesApprouvees: 0,
    totalPvs: 0,
  }

  constructor(
    private authService: AuthService,
    private demandeService: DemandeService,
    private pvService: PvService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole()
    const currentUser = this.authService.getCurrentUser()

    if (currentUser) {
      if ("nom" in currentUser && "prenom" in currentUser) {
        this.userName = `${(currentUser as any).prenom} ${(currentUser as any).nom}`
      } else {
        this.userName = currentUser.email
      }
    }

    switch (this.userRole) {
      case UserRole.CITOYEN:
        this.userRoleDisplay = "Citoyen"
        this.loadCitoyenStats()
        break
      case UserRole.MAIRE:
        this.userRoleDisplay = "Maire"
        this.loadMaireStats()
        break
      case UserRole.PROCUREUR:
        this.userRoleDisplay = "Procureur"
        this.loadProcureurStats()
        break
      case UserRole.POLICIER:
        this.userRoleDisplay = "Policier"
        this.loadPolicierStats()
        break
      default:
        this.userRoleDisplay = "Utilisateur"
    }
  }

  loadCitoyenStats(): void {
    const userId = this.authService.getCurrentUser()?.id
    if (userId) {
      this.demandeService.getDemandesByCitoyen(userId).subscribe((demandes) => {
        this.stats.totalDemandes = demandes.length
        this.stats.demandesEnCours = demandes.filter((d) => d.etat === "EN_ATTENTE").length
        this.stats.demandesApprouvees = demandes.filter((d) => d.etat === "APPROUVEE").length
      })

      this.pvService.getPvsByCitoyen(userId).subscribe((pvs) => {
        this.stats.totalPvs = pvs.length
      })
    }
  }

  loadMaireStats(): void {
    this.demandeService.getAllDemandes().subscribe((demandes) => {
      this.stats.totalDemandes = demandes.length
      this.stats.demandesEnCours = demandes.filter((d) => d.etat === "EN_ATTENTE").length
    })
  }

  loadProcureurStats(): void {
    this.demandeService.getAllDemandes().subscribe((demandes) => {
      this.stats.totalDemandes = demandes.length
      this.stats.demandesEnCours = demandes.filter((d) => d.etat === "EN_ATTENTE").length
    })

    this.pvService.getAllPvs().subscribe((pvs) => {
      this.stats.totalPvs = pvs.length
    })
  }

  loadPolicierStats(): void {
    const userId = this.authService.getCurrentUser()?.id
    if (userId) {
      this.pvService.getPvsByPolicier(userId).subscribe((pvs) => {
        this.stats.totalPvs = pvs.length
      })
    }
  }
}
