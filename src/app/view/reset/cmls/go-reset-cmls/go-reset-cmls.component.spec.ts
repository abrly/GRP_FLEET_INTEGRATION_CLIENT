import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoResetCmlsComponent } from './go-reset-cmls.component';

describe('GoResetCmlsComponent', () => {
  let component: GoResetCmlsComponent;
  let fixture: ComponentFixture<GoResetCmlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoResetCmlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoResetCmlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
