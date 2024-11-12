import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoExportCmlsComponent } from './go-export-cmls.component';

describe('GoExportCmlsComponent', () => {
  let component: GoExportCmlsComponent;
  let fixture: ComponentFixture<GoExportCmlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoExportCmlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoExportCmlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
