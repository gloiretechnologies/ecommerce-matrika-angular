import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanglesBraceletsComponent } from './bangles-bracelets.component';

describe('BanglesBraceletsComponent', () => {
  let component: BanglesBraceletsComponent;
  let fixture: ComponentFixture<BanglesBraceletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanglesBraceletsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanglesBraceletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
