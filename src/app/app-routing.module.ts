import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CriticalSystemComponent } from './critical-system/critical-system.component';
import { ViewCdaComponent } from './view-cda/view-cda.component';
import { cdaResolver } from './_resolver/cda-resolver-service';
import { csResolver } from './_resolver/criticalSyst-resolver-service';
import { SecurityControlTreeComponent } from './security-control-tree/security-control-tree.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {

        path: 'critical-system',
        component: CriticalSystemComponent,
        resolve:{
          items:csResolver
        }

      },
      {
        path: 'critical-digital-asset',
        component: ViewCdaComponent,
        resolve:{
          items:cdaResolver
        }
      },
      {
        path:'security-control-tree',
        component:SecurityControlTreeComponent
      }
    ]
  }
  // {
  //   path:'',
  //   component:HomeComponent
  // },
  // {
  //   path:'critical-system',
  //   component:CriticalSystemComponent
  // },
  // {
  //   path:'critical-digital-asset',
  //   component:ViewCdaComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
