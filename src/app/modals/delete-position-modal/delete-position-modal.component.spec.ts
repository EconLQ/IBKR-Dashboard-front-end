import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePositionModalComponent } from './delete-position-modal.component';

describe('DeletePositionModalComponent', () => {
  let component: DeletePositionModalComponent;
  let fixture: ComponentFixture<DeletePositionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletePositionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePositionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
