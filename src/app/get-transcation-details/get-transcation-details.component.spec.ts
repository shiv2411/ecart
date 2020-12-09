import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTranscationDetailsComponent } from './get-transcation-details.component';

describe('GetTranscationDetailsComponent', () => {
  let component: GetTranscationDetailsComponent;
  let fixture: ComponentFixture<GetTranscationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTranscationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTranscationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
