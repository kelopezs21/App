import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesSuscripcionPage } from './planes-suscripcion.page';

describe('PlanesSuscripcionPage', () => {
  let component: PlanesSuscripcionPage;
  let fixture: ComponentFixture<PlanesSuscripcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesSuscripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
