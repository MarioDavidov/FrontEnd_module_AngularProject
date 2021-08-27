import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAppComponent } from './rate-app.component';

describe('RateAppComponent', () => {
  let component: RateAppComponent;
  let fixture: ComponentFixture<RateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
