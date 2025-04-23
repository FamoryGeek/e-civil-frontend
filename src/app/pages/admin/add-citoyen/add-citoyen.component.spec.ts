import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCitoyenComponent } from './add-citoyen.component';

describe('AddCitoyenComponent', () => {
  let component: AddCitoyenComponent;
  let fixture: ComponentFixture<AddCitoyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCitoyenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCitoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
