import { inject } from "@angular/core"
import { type CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const userRole = authService.getUserRole()
  const allowedRoles = route.data?.["roles"] as string[]

  if (userRole && allowedRoles && allowedRoles.includes(userRole)) {
    return true
  }

  // Rediriger vers le dashboard si l'utilisateur n'a pas le rôle requis
  router.navigate(["/dashboard"])
  return false
}
