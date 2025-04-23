import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcureurProfileComponent } from './procureur-profile.component';

describe('ProcureurProfileComponent', () => {
  let component: ProcureurProfileComponent;
  let fixture: ComponentFixture<ProcureurProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcureurProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcureurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
