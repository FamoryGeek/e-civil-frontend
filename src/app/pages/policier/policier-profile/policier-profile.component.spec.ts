import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicierProfileComponent } from './policier-profile.component';

describe('PolicierProfileComponent', () => {
  let component: PolicierProfileComponent;
  let fixture: ComponentFixture<PolicierProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicierProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicierProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
