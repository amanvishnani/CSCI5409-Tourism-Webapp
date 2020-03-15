import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBusComponent } from './book-bus.component';

describe('BookBusComponent', () => {
  let component: BookBusComponent;
  let fixture: ComponentFixture<BookBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
