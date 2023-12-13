import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToPositionComponent } from './add-to-position.component';

describe('AddToPositionComponent', () => {
  let component: AddToPositionComponent;
  let fixture: ComponentFixture<AddToPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
