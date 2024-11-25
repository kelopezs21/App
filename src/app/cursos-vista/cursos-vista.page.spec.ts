import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosVistaPage } from './cursos-vista.page';

describe('CursosVistaPage', () => {
  let component: CursosVistaPage;
  let fixture: ComponentFixture<CursosVistaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosVistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
