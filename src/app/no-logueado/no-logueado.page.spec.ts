import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoLogueadoPage } from './no-logueado.page';

describe('NoLogueadoPage', () => {
  let component: NoLogueadoPage;
  let fixture: ComponentFixture<NoLogueadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLogueadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
