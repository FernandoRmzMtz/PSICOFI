import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPage } from './reportes.page';

describe('ReportesPage', () => {
  let component: ReportesPage;
  let fixture: ComponentFixture<ReportesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesPage]
    });
    fixture = TestBed.createComponent(ReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
