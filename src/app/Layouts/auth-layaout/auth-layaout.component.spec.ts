import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayaoutComponent } from './auth-layaout.component';

describe('AuthLayaoutComponent', () => {
  let component: AuthLayaoutComponent;
  let fixture: ComponentFixture<AuthLayaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayaoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLayaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
