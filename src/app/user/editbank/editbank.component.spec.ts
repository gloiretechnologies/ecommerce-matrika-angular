import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbankComponent } from './editbank.component';

describe('EditbankComponent', () => {
  let component: EditbankComponent;
  let fixture: ComponentFixture<EditbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditbankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
