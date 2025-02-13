import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpicificCatDetailsComponent } from './spicific-cat-details.component';

describe('SpicificCatDetailsComponent', () => {
  let component: SpicificCatDetailsComponent;
  let fixture: ComponentFixture<SpicificCatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpicificCatDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpicificCatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
