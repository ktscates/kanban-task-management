import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalDisplayComponent } from './task-modal-display.component';

describe('TaskModalDisplayComponent', () => {
  let component: TaskModalDisplayComponent;
  let fixture: ComponentFixture<TaskModalDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
