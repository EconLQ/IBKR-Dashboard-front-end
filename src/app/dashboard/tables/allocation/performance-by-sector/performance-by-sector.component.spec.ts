import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceBySectorComponent } from './performance-by-sector.component';

describe('PerformanceBySectorComponent', () => {
  let component: PerformanceBySectorComponent;
  let fixture: ComponentFixture<PerformanceBySectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceBySectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceBySectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
