import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderRegPage } from './rider-reg.page';

describe('RiderRegPage', () => {
  let component: RiderRegPage;
  let fixture: ComponentFixture<RiderRegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderRegPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
