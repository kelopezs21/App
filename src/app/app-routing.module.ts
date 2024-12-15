import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cursos-vista',
    loadChildren: () => import('./cursos-vista/cursos-vista.module').then(m => m.CursosVistaPageModule)
  },
  {
    path: 'planes-suscripcion',
    loadChildren: () => import('./planes-suscripcion/planes-suscripcion.module').then(m => m.PlanesSuscripcionPageModule)
  },
  {
    path: 'detalle-plan',
    loadChildren: () => import('./detalle-plan/detalle-plan.module').then(m => m.DetallePlanPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then(m => m.PagoPageModule)
  },
  {
    path: 'carrito-compras',
    loadChildren: () => import('./carrito-compras/carrito-compras.module').then(m => m.CarritoComprasPageModule)
  },
  {
    path: 'no-logueado',
    loadChildren: () => import('./no-logueado/no-logueado.module').then(m => m.NoLogueadoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  },
  {
    path: 'curso-detalle/:id',
    loadChildren: () => import('./curso-detalle/curso-detalle.module').then(m => m.CursoDetallePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
