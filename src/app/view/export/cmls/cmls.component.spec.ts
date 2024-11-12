import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmlsComponent } from './cmls.component';

describe('CmlsComponent', () => {
  let component: CmlsComponent;
  let fixture: ComponentFixture<CmlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
