import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuschatPage } from './cuschat.page';

describe('CuschatPage', () => {
  let component: CuschatPage;
  let fixture: ComponentFixture<CuschatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuschatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuschatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
