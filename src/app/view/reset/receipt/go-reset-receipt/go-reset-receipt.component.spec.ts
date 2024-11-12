import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoResetReceiptComponent } from './go-reset-receipt.component';

describe('GoResetReceiptComponent', () => {
  let component: GoResetReceiptComponent;
  let fixture: ComponentFixture<GoResetReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoResetReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoResetReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
