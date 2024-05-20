import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoinfoPage } from './alumnoinfo.page';

describe('AlumnoinfoComponent', () => {
  let component: AlumnoinfoPage;
  let fixture: ComponentFixture<AlumnoinfoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoinfoPage]
    });
    fixture = TestBed.createComponent(AlumnoinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
