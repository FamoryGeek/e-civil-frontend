import { Component, type OnInit } from "@angular/core"
import { RouterLink, RouterLinkActive } from "@angular/router"
import { NgIf, NgSwitch, NgSwitchCase } from "@angular/common"
import { AuthService } from "../../services/auth.service"
import { UserRole } from "../../models/utilisateur.model"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgSwitch, NgSwitchCase],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <a routerLink="/dashboard">
            <span class="logo-icon">E</span>
            <span class="logo-text">E-Civil</span>
          </a>
        </div>

        <nav class="nav" *ngIf="authService.isLoggedIn()">
          <ul [ngSwitch]="userRole">
            <!-- Menu Citoyen -->
            <ng-container *ngSwitchCase="'CITOYEN'">
              <li><a routerLink="/citoyen/profile" routerLinkActive="active">Mon Profil</a></li>
              <li><a routerLink="/citoyen/demandes" routerLinkActive="active">Mes Demandes</a></li>
              <li><a routerLink="/citoyen/nouvelle-demande" routerLinkActive="active">Nouvelle Demande</a></li>
              <li><a routerLink="/citoyen/pvs" routerLinkActive="active">Mes PVs</a></li>
            </ng-container>

            <!-- Menu Maire -->
            <ng-container *ngSwitchCase="'MAIRE'">
              <li><a routerLink="/maire/profile" routerLinkActive="active">Mon Profil</a></li>
              <li><a routerLink="/maire/demandes" routerLinkActive="active">Demandes</a></li>
            </ng-container>

            <!-- Menu Procureur -->
            <ng-container *ngSwitchCase="'PROCUREUR'">
              <li><a routerLink="/procureur/profile" routerLinkActive="active">Mon Profil</a></li>
              <li><a routerLink="/procureur/demandes" routerLinkActive="active">Demandes</a></li>
              <li><a routerLink="/procureur/pvs" routerLinkActive="active">PVs</a></li>
            </ng-container>

            <!-- Menu Policier -->
            <ng-container *ngSwitchCase="'POLICIER'">
              <li><a routerLink="/policier/profile" routerLinkActive="active">Mon Profil</a></li>
              <li><a routerLink="/policier/pvs" routerLinkActive="active">PVs</a></li>
              <li><a routerLink="/policier/nouveau-pv" routerLinkActive="active">Nouveau PV</a></li>
            </ng-container>

            <!-- Menu Admin -->
            <ng-container *ngSwitchCase="'ADMIN'">
              <li><a routerLink="/admin/dashboard" routerLinkActive="active">Tableau de bord</a></li>
              <li><a routerLink="/admin/users" routerLinkActive="active">Utilisateurs</a></li>
              <li><a routerLink="/admin/demandes" routerLinkActive="active">Demandes</a></li>
              <li><a routerLink="/admin/pvs" routerLinkActive="active">PVs</a></li>
            </ng-container>
          </ul>
        </nav>

        <div class="user-menu" *ngIf="authService.isLoggedIn()">
          <div class="user-info">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">{{ userRoleDisplay }}</span>
          </div>
          <div class="avatar">
            {{ userInitials }}
          </div>
          <button class="logout-button" (click)="logout()">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
    .header {
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 0.75rem 1.5rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1400px;
      margin: 0 auto;
    }

    .logo {
      display: flex;
      align-items: center;
    }

    .logo a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: var(--primary);
      font-weight: 700;
      font-size: 1.25rem;
    }

    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-color: var(--primary);
      color: white;
      border-radius: 8px;
      margin-right: 0.5rem;
    }

    .nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 1rem;
    }

    .nav a {
      text-decoration: none;
      color: var(--gray-700);
      font-weight: 500;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
    }

    .nav a:hover {
      background-color: var(--gray-50);
      color: var(--primary);
    }

    .nav a.active {
      background-color: rgba(79, 70, 229, 0.1);
      color: var(--primary);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .user-name {
      font-weight: 600;
      color: var(--gray-800);
      font-size: 0.875rem;
    }

    .user-role {
      font-size: 0.75rem;
      color: var(--gray-500);
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .logout-button {
      background: none;
      border: none;
      color: var(--gray-500);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .logout-button:hover {
      background-color: var(--gray-100);
      color: var(--danger);
    }

    @media (max-width: 768px) {
      .nav {
        display: none;
      }

      .user-info {
        display: none;
      }
    }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  userRole: UserRole | null = null
  userName = ""
  userInitials = ""
  userRoleDisplay = ""

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole()

    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        if ("nom" in user && "prenom" in user) {
          const nom = (user as any).nom
          const prenom = (user as any).prenom
          this.userName = `${prenom} ${nom}`
          this.userInitials = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
        } else {
          this.userName = user.email
          this.userInitials = user.email.substring(0, 2).toUpperCase()
        }
      }
    })

    switch (this.userRole) {
      case UserRole.CITOYEN:
        this.userRoleDisplay = "Citoyen"
        break
      case UserRole.MAIRE:
        this.userRoleDisplay = "Maire"
        break
      case UserRole.PROCUREUR:
        this.userRoleDisplay = "Procureur"
        break
      case UserRole.POLICIER:
        this.userRoleDisplay = "Policier"
        break
      case UserRole.ADMIN:
        this.userRoleDisplay = "Administrateur"
        break
      default:
        this.userRoleDisplay = "Utilisateur"
    }
  }

  logout(): void {
    this.authService.logout()
  }
}
