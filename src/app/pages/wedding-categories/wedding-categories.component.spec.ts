import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingCategoriesComponent } from './wedding-categories.component';

describe('WeddingCategoriesComponent', () => {
  let component: WeddingCategoriesComponent;
  let fixture: ComponentFixture<WeddingCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeddingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
