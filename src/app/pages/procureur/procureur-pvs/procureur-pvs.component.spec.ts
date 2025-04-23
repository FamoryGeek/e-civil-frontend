import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcureurPvsComponent } from './procureur-pvs.component';

describe('ProcureurPvsComponent', () => {
  let component: ProcureurPvsComponent;
  let fixture: ComponentFixture<ProcureurPvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcureurPvsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcureurPvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
