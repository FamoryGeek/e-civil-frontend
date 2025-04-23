import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenProfileComponent } from './citoyen-profile.component';

describe('CitoyenProfileComponent', () => {
  let component: CitoyenProfileComponent;
  let fixture: ComponentFixture<CitoyenProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitoyenProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitoyenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
