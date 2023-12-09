import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodBenchCompComponent } from './time-period-bench-comp.component';

describe('TimePeriodBenchCompComponent', () => {
  let component: TimePeriodBenchCompComponent;
  let fixture: ComponentFixture<TimePeriodBenchCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimePeriodBenchCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimePeriodBenchCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
