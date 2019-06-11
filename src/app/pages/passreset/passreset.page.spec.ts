import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassresetPage } from './passreset.page';

describe('PassresetPage', () => {
  let component: PassresetPage;
  let fixture: ComponentFixture<PassresetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassresetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassresetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
