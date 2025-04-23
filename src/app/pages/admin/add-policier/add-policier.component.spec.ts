import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolicierComponent } from './add-policier.component';

describe('AddPolicierComponent', () => {
  let component: AddPolicierComponent;
  let fixture: ComponentFixture<AddPolicierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPolicierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPolicierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
