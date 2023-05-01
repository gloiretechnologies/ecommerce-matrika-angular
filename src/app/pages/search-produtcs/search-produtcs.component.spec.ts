import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProdutcsComponent } from './search-produtcs.component';

describe('SearchProdutcsComponent', () => {
  let component: SearchProdutcsComponent;
  let fixture: ComponentFixture<SearchProdutcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProdutcsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProdutcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
