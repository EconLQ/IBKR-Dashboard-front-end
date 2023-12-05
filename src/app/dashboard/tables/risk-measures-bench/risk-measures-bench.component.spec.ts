import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMeasuresBenchComponent } from './risk-measures-bench.component';

describe('RiskMeasuresBenchComponent', () => {
  let component: RiskMeasuresBenchComponent;
  let fixture: ComponentFixture<RiskMeasuresBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskMeasuresBenchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiskMeasuresBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
