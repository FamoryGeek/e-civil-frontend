import { HttpInterceptorFn, HttpErrorResponse  } from "@angular/common/http"
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { catchError, throwError } from "rxjs"


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const token = authService.getToken()

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    })
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si le token est expiré ou invalide (401 Unauthorized)
        if (error.status === 401) {
          authService.logout()
          router.navigate(["/login"])
        }
        return throwError(() => error)
      }),
    )
  }

  return next(req)
}
