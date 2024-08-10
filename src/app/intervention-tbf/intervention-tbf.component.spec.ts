import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionTbfComponent } from './intervention-tbf.component';

describe('InterventionTbfComponent', () => {
  let component: InterventionTbfComponent;
  let fixture: ComponentFixture<InterventionTbfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionTbfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionTbfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
