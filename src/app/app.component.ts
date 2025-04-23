import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { HeaderComponent } from "./components/header/header.component"
import { SidebarComponent } from "./components/sidebar/sidebar.component"
import { FooterComponent } from "./components/footer/footer.component"
import { CommonModule } from "@angular/common"
import  { AuthService } from "./services/auth.service"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent,CommonModule],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="content-container">
        <app-sidebar *ngIf="authService.isLoggedIn()"></app-sidebar>
        <main [ngClass]="{'main-content': true, 'with-sidebar': authService.isLoggedIn(), 'full-width': !authService.isLoggedIn()}">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--gray-100);
    }
    .content-container {
      display: flex;
      flex: 1;
    }
    .main-content {
      flex: 1;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }
    .main-content.with-sidebar {
      margin-left: 250px;
    }
    .main-content.full-width {
      margin-left: 0;
    }

    @media (max-width: 768px) {
      .main-content.with-sidebar {
        margin-left: 0;
      }
    }
  `,
  ],
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
