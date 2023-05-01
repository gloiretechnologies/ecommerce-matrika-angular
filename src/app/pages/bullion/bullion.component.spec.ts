import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullionComponent } from './bullion.component';

describe('BullionComponent', () => {
  let component: BullionComponent;
  let fixture: ComponentFixture<BullionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BullionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BullionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
