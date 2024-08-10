import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionByCompagnieComponent } from './intervention-by-compagnie.component';

describe('InterventionByCompagnieComponent', () => {
  let component: InterventionByCompagnieComponent;
  let fixture: ComponentFixture<InterventionByCompagnieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionByCompagnieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionByCompagnieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
