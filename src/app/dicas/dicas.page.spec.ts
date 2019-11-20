import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicasPage } from './dicas.page';

describe('DicasPage', () => {
  let component: DicasPage;
  let fixture: ComponentFixture<DicasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
