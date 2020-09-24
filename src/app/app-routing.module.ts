import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CriticalSystemComponent } from './critical-system/critical-system.component';
import { ViewCdaComponent } from './view-cda/view-cda.component';
import { cdaResolver } from './_resolver/cda-resolver-service';
import { csResolver } from './_resolver/criticalSyst-resolver-service';
import { SecurityControlTreeComponent } from './security-control-tree/security-control-tree.component';
import { ScipComponent } from 'src/app/scip/scip.component';
import { scipsResolver } from './_resolver/scips-resolver';

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
        },
        data: {
          title: 'criticalSystem',
          urls: [
            { title: 'criticalSystem' }
          ]
        }

      },
      {
        path: 'critical-digital-asset',
        component: ViewCdaComponent,
        resolve:{
          items:cdaResolver
        },
        data: {
          title: 'criticalDigitalAsset',
          urls: [
            { title: 'criticalDigitalAsset' }
          ]
        }
      },
      {
        path:'security-control-tree',
        component:SecurityControlTreeComponent,
        data: {
          title: 'securityControlTree',
          urls: [
            { title: 'securityControlTree' }
          ]
        }
      },
      {
        path:'scip',
        component:ScipComponent,
        resolve:{
          items:scipsResolver
        },
        data: {
          title: 'Scip',
          urls: [
            { title: 'Scip' }
          ]
        }
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
