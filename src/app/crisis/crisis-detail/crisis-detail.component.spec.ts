import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisisDetailComponent } from './crisis-detail.component';

describe('CrisisDetailComponent', () => {
  let component: CrisisDetailComponent;
  let fixture: ComponentFixture<CrisisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrisisDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisiosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
