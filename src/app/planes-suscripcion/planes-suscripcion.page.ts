import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-planes-suscripcion',
  templateUrl: './planes-suscripcion.page.html',
  styleUrls: ['./planes-suscripcion.page.scss'],
})
export class PlanesSuscripcionPage implements OnInit {

  constructor(private router: Router) {}

  goToDetail(plan: string) {
    this.router.navigate(['/detalle-plan'], { queryParams: { plan } });
  }
  ngOnInit() {
  }

}
