import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledPickupsPage } from './scheduled-pickups.page';

describe('ScheduledPickupsPage', () => {
  let component: ScheduledPickupsPage;
  let fixture: ComponentFixture<ScheduledPickupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledPickupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledPickupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
