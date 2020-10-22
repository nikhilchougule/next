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
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AssessmentsComponent } from './assessments/assessments.component';
import { WalkdownComponent } from './walkdown/walkdown.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssessmentResultComponent } from './assessments/assessment-result/assessment-result.component';
import { ControlCdaListComponent } from './control-cda-list/control-cda-list.component';
import { ControlCsListComponent } from './control-cs-list/control-cs-list.component';
import { CriticalDigitalAssetListComponent } from './critical-digital-asset-list/critical-digital-asset-list.component';
import { CdaTemplateComponent } from './cda-template/cda-template.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
 },
 
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path:'dashboard',
        component:DashboardComponent,
        data: {
          title: 'dashboard',
          urls: [
            { title: 'dashboard' }
          ]
        }
      },
     
      {
        path:'WalkDown',
        component:WalkdownComponent,
      
        data: {
          title: 'WalkDown',
          urls: [
            { title: 'WalkDown' }
          ]
        }
      },
      {
        path:'Assessment',
        component:AssessmentsComponent,
      
        data: {
          title: 'Assessment',
          urls: [
            { title: 'Assessment' }
          ]
        }
      },
      {
        path:'AssessmentResult',
        component:AssessmentResultComponent,
        data: {
          title: 'AssessmentResult',
          urls: [
            { title: 'AssessmentResult' }
          ]
        }
     },
     {
      
        path:'SetUpDAList',
        component:ControlCdaListComponent,
        data: {
          title: 'SetUpDAList',
          urls: [
            { title: 'SetUpDAList' }
          ]
        }  
     },
     
   {
      path:'CDAAttributes',
      component:CdaTemplateComponent,
      data: {
        title: 'CDA Attributes',
        urls: [
          { title: 'CDA Attributes' }
        ]
      }  
   },
   {
      path:'CSDA',
      children:[
        {

          path: 'cs',
          component: CriticalSystemComponent,
          resolve:{
            items:csResolver
          },
          data: {
            title: 'criticalSystem',
            urls: [
              { title: 'criticalSystem' }
            ]
          },
          canActivate:[AuthGuard]
  
        },
        {
          path: 'cda',
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
        },
        {
      
          path:'ControlList',
          component:CriticalDigitalAssetListComponent,
          data: {
            title: 'ControlList',
            urls: [
              { title: 'ControlList' }
            ]
          }  
       },
      ]
   },
   {
       path:'apps',
       loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
   }
    ]
  },
  
  
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
