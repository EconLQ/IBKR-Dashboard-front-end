import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTableModalComponent } from './refresh-table-modal.component';

describe('RefreshTableModalComponent', () => {
  let component: RefreshTableModalComponent;
  let fixture: ComponentFixture<RefreshTableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefreshTableModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefreshTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
