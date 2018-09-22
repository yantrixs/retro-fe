import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCatalogComponent } from './board-catalog.component';

describe('BoardCatalogComponent', () => {
  let component: BoardCatalogComponent;
  let fixture: ComponentFixture<BoardCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
