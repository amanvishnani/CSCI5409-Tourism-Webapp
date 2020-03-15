import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionDetailsComponent } from './attraction-details.component';

describe('AttractionDetailsComponent', () => {
  let component: AttractionDetailsComponent;
  let fixture: ComponentFixture<AttractionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
