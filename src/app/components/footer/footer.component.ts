import { Component } from "@angular/core"

@Component({
  selector: "app-footer",
  standalone: true,
  template: `
    <footer class="footer">
      <p>&copy; {{ currentYear }} Your Company Name. All rights reserved.</p>
    </footer>
  `,
  styles: [
    `
    .footer {
      padding: 1rem 2rem;
      background-color: #f5f5f5;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
  `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear()
}
