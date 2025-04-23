import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaireProfileComponent } from './maire-profile.component';

describe('MaireProfileComponent', () => {
  let component: MaireProfileComponent;
  let fixture: ComponentFixture<MaireProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaireProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaireProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
