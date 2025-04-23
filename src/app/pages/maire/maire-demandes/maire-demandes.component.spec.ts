import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaireDemandesComponent } from './maire-demandes.component';

describe('MaireDemandesComponent', () => {
  let component: MaireDemandesComponent;
  let fixture: ComponentFixture<MaireDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaireDemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaireDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
