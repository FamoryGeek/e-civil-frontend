import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/">Go to Home</a>
    </div>
  `,
  styles: [
    `
    .not-found {
      text-align: center;
      padding: 4rem 1rem;
    }
    h1 {
      font-size: 6rem;
      margin: 0;
      color: #3f51b5;
    }
    h2 {
      font-size: 2rem;
      margin-top: 0;
    }
    a {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.75rem 1.5rem;
      background-color: #3f51b5;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `,
  ],
})
export class NotFoundComponent {}
