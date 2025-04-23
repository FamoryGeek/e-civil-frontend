import { Component, type OnInit } from "@angular/core"
import { NgFor, NgIf, DatePipe } from "@angular/common"
import { PvService } from "../../../services/pv.service"
import { AuthService } from "../../../services/auth.service"
import { Pv } from "../../../models/pv.model"

@Component({
  selector: "app-citoyen-pvs",
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  template: `
    <div class="pvs-container">
      <h1>Mes procès-verbaux</h1>

      <div class="pvs-list" *ngIf="pvs.length > 0; else noPvs">
        <table>
          <thead>
            <tr>
              <th>Libellé</th>
              <th>Source</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let pv of pvs">
              <td>{{ pv.libelle }}</td>
              <td>{{ pv.source }}</td>
              <td>{{ pv.dateCreation | date:'dd/MM/yyyy' }}</td>
              <td>
                <button class="action-button">Détails</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noPvs>
        <div class="no-data">
          <p>Vous n'avez pas de procès-verbaux.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
    .pvs-container {
      padding: 1.5rem;
    }
    h1 {
      margin-bottom: 2rem;
    }
    .pvs-list {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
    .action-button {
      padding: 0.5rem 1rem;
      background-color: #f5f5f5;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }
    .no-data {
      text-align: center;
      padding: 3rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .no-data p {
      color: #666;
    }
    `,
  ],
})
export class CitoyenPvsComponent implements OnInit {
  pvs: Pv[] = []

  constructor(
    private pvService: PvService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUser()?.id
    if (userId) {
      this.pvService.getPvsByCitoyen(userId).subscribe((pvs) => {
        this.pvs = pvs
      })
    }
  }
}
