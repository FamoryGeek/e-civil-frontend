import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPvsComponent } from './admin-pvs.component';

describe('AdminPvsComponent', () => {
  let component: AdminPvsComponent;
  let fixture: ComponentFixture<AdminPvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPvsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
