import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusRegPage } from './cus-reg.page';

describe('CusRegPage', () => {
  let component: CusRegPage;
  let fixture: ComponentFixture<CusRegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusRegPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
