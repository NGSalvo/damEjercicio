import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'device',
    loadChildren: () =>
      import('./device/device.module').then((m) => m.DevicePageModule),
  },
  {
    path: 'device/:id',
    loadChildren: () =>
      import('./device/device.module').then((m) => m.DevicePageModule),
  },
  {
    path: 'device/measurements/:id',
    loadChildren: () =>
      import('./measurement-list/measurement-list.module').then(
        (m) => m.MeasurementListPageModule
      ),
  },
  // { No quiero navegacion directa
  //   path: 'irrigation-log-list',
  //   loadChildren: () => import('./irrigation-log-list/irrigation-log-list.module').then( m => m.IrrigationLogListPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
