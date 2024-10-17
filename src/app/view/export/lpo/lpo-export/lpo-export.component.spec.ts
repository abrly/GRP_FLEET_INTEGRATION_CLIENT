import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpoExportComponent } from './lpo-export.component';

describe('LpoExportComponent', () => {
  let component: LpoExportComponent;
  let fixture: ComponentFixture<LpoExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LpoExportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LpoExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
