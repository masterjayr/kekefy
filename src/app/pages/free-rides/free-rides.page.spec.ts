import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeRidesPage } from './free-rides.page';

describe('FreeRidesPage', () => {
  let component: FreeRidesPage;
  let fixture: ComponentFixture<FreeRidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeRidesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeRidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
