import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlogsComponent } from './viewlogs.component';

describe('ViewlogsComponent', () => {
  let component: ViewlogsComponent;
  let fixture: ComponentFixture<ViewlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewlogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
