import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDisplayinfoComponent } from './subject-displayinfo.component';

describe('SubjectDisplayinfoComponent', () => {
  let component: SubjectDisplayinfoComponent;
  let fixture: ComponentFixture<SubjectDisplayinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDisplayinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDisplayinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
