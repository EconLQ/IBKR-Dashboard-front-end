import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistPerfBenchCompComponent } from './hist-perf-bench-comp.component';

describe('HistPerfBenchCompComponent', () => {
  let component: HistPerfBenchCompComponent;
  let fixture: ComponentFixture<HistPerfBenchCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistPerfBenchCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistPerfBenchCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
