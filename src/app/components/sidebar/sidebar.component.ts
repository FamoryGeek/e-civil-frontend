import { Component, OnInit } from "@angular/core"
import { RouterLink, RouterLinkActive } from "@angular/router"
import { CommonModule , NgSwitch, NgSwitchCase } from "@angular/common"
import { AuthService } from "../../services/auth.service"
import { UserRole } from "../../models/utilisateur.model"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule , NgSwitch, NgSwitchCase],
  template: `
    <aside class="sidebar">
      <div class="user-profile">
        <div class="avatar">{{ userInitials }}</div>
        <div class="user-info">
          <div class="user-name">{{ userName }}</div>
          <div class="user-role">{{ userRoleDisplay }}</div>
        </div>
      </div>

      <div class="sidebar-divider"></div>

      <nav class="sidebar-nav" [ngSwitch]="userRole">
        <!-- Menu Citoyen -->
        <ng-container *ngSwitchCase="'CITOYEN'">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Tableau de bord</span>
          </a>
          <a routerLink="/citoyen/profile" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Mon Profil</span>
          </a>
          <a routerLink="/citoyen/demandes" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Mes Demandes</span>
          </a>
          <a routerLink="/citoyen/nouvelle-demande" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Nouvelle Demande</span>
          </a>
          <a routerLink="/citoyen/pvs" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Mes PVs</span>
          </a>
        </ng-container>

        <!-- Menu Maire -->
        <ng-container *ngSwitchCase="'MAIRE'">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Tableau de bord</span>
          </a>
          <a routerLink="/maire/profile" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Mon Profil</span>
          </a>
          <a routerLink="/maire/demandes" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Demandes</span>
          </a>
        </ng-container>

        <!-- Menu Procureur -->
        <ng-container *ngSwitchCase="'PROCUREUR'">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Tableau de bord</span>
          </a>
          <a routerLink="/procureur/profile" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Mon Profil</span>
          </a>
          <a routerLink="/procureur/demandes" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Demandes</span>
          </a>
          <a routerLink="/procureur/pvs" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>PVs</span>
          </a>
        </ng-container>

        <!-- Menu Policier -->
        <ng-container *ngSwitchCase="'POLICIER'">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Tableau de bord</span>
          </a>
          <a routerLink="/policier/profile" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Mon Profil</span>
          </a>
          <a routerLink="/policier/pvs" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>PVs</span>
          </a>
          <a routerLink="/policier/nouveau-pv" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Nouveau PV</span>
          </a>
        </ng-container>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-button" (click)="logout()">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  `,
  styles: [
    `
    .sidebar {
      width: 250px;
      height: 100%;
      background-color: white;
      box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 50;
      transition: all 0.3s ease;
    }
    .user-profile {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--gray-100);
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1rem;
      margin-right: 1rem;
    }
    .user-info {
      overflow: hidden;
    }
    .user-name {
      font-weight: 600;
      color: var(--gray-800);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-role {
      font-size: 0.75rem;
      color: var(--gray-500);
    }
    .sidebar-divider {
      height: 1px;
      background-color: var(--gray-100);
      margin: 0.5rem 0;
    }
    .sidebar-nav {
      flex: 1;
      padding: 1rem 0;
      overflow-y: auto;
    }
    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--gray-700);
      text-decoration: none;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
    }
    .nav-item svg {
      margin-right: 0.75rem;
      color: var(--gray-500);
    }
    .nav-item:hover {
      background-color: var(--gray-50);
      color: var(--primary);
    }
    .nav-item:hover svg {
      color: var(--primary);
    }
    .nav-item.active {
      background-color: rgba(79, 70, 229, 0.1);
      color: var(--primary);
      border-left-color: var(--primary);
      font-weight: 500;
    }
    .nav-item.active svg {
      color: var(--primary);
    }
    .sidebar-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--gray-100);
    }
    .logout-button {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.75rem;
      background-color: var(--gray-50);
      color: var(--gray-700);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .logout-button svg {
      margin-right: 0.75rem;
    }
    .logout-button:hover {
      background-color: var(--gray-100);
      color: var(--danger);
    }
    .logout-button:hover svg {
      color: var(--danger);
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }
    }
    `,
  ],
})
export class SidebarComponent implements OnInit {
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
      default:
        this.userRoleDisplay = "Utilisateur"
    }
  }

  logout(): void {
    this.authService.logout()
  }
}
