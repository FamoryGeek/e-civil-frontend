import { Routes } from "@angular/router"
import { LoginComponent } from "./pages/login/login.component"
import { RegisterComponent } from "./pages/register/register.component"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { NotFoundComponent } from "./pages/not-found/not-found.component"
import { authGuard } from "./guards/auth.guard"
import { roleGuard } from "./guards/role.guard"
import { UserRole } from "./models/utilisateur.model"

// Citoyen
import { CitoyenProfileComponent } from "./pages/citoyen/citoyen-profile/citoyen-profile.component"
import { CitoyenDemandesComponent } from "./pages/citoyen/citoyen-demandes/citoyen-demandes.component"
import { CitoyenPvsComponent } from "./pages/citoyen/citoyen-pvs/citoyen-pvs.component"
import { NouvelleDemandeComponent } from "./pages/citoyen/nouvelle-demande/nouvelle-demande.component"

// Maire
import { MaireProfileComponent } from "./pages/maire/maire-profile/maire-profile.component"
import { MaireDemandesComponent } from "./pages/maire/maire-demandes/maire-demandes.component"

// Procureur
import { ProcureurProfileComponent } from "./pages/procureur/procureur-profile/procureur-profile.component"
import { ProcureurDemandesComponent } from "./pages/procureur/procureur-demandes/procureur-demandes.component"
import { ProcureurPvsComponent } from "./pages/procureur/procureur-pvs/procureur-pvs.component"

// Policier
import { PolicierProfileComponent } from "./pages/policier/policier-profile/policier-profile.component"
import { PolicierPvsComponent } from "./pages/policier/policier-pvs/policier-pvs.component"
import { NouveauPvComponent } from "./pages/policier/nouveau-pv/nouveau-pv.component"

// Admin
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component"
import { AdminUsersComponent } from "./pages/admin/admin-users/admin-users.component"
import { AdminDemandesComponent } from "./pages/admin/admin-demandes/admin-demandes.component"
import { AdminPvsComponent } from "./pages/admin/admin-pvs/admin-pvs.component"
import { AddCitoyenComponent } from "./pages/admin/add-citoyen/add-citoyen.component"
import { AddMaireComponent } from "./pages/admin/add-maire/add-maire.component"
import { AddProcureurComponent } from "./pages/admin/add-procureur/add-procureur.component"
import { AddPolicierComponent } from "./pages/admin/add-policier/add-policier.component"

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  // Routes Citoyen
  {
    path: "citoyen",
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.CITOYEN] },
    children: [
      { path: "profile", component: CitoyenProfileComponent },
      { path: "demandes", component: CitoyenDemandesComponent },
      { path: "nouvelle-demande", component: NouvelleDemandeComponent },
      { path: "pvs", component: CitoyenPvsComponent },
    ],
  },

  // Routes Maire
  {
    path: "maire",
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.MAIRE] },
    children: [
      { path: "profile", component: MaireProfileComponent },
      { path: "demandes", component: MaireDemandesComponent },
    ],
  },

  // Routes Procureur
  {
    path: "procureur",
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.PROCUREUR] },
    children: [
      { path: "profile", component: ProcureurProfileComponent },
      { path: "demandes", component: ProcureurDemandesComponent },
      { path: "pvs", component: ProcureurPvsComponent },
    ],
  },

  // Routes Policier
  {
    path: "policier",
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.POLICIER] },
    children: [
      { path: "profile", component: PolicierProfileComponent },
      { path: "pvs", component: PolicierPvsComponent },
      { path: "nouveau-pv", component: NouveauPvComponent },
    ],
  },

  // Routes Admin
  {
    path: "admin",
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.ADMIN] },
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "users", component: AdminUsersComponent },
      { path: "demandes", component: AdminDemandesComponent },
      { path: "pvs", component: AdminPvsComponent },
      { path: "add-citoyen", component: AddCitoyenComponent },
      { path: "add-maire", component: AddMaireComponent },
      { path: "add-procureur", component: AddProcureurComponent },
      { path: "add-policier", component: AddPolicierComponent },
    ],
  },

  { path: "**", component: NotFoundComponent },
]
