import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcureurComponent } from './add-procureur.component';

describe('AddProcureurComponent', () => {
  let component: AddProcureurComponent;
  let fixture: ComponentFixture<AddProcureurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProcureurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProcureurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
