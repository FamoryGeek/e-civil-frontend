import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaireComponent } from './add-maire.component';

describe('AddMaireComponent', () => {
  let component: AddMaireComponent;
  let fixture: ComponentFixture<AddMaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
