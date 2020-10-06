import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainMaterialModule } from './main-material-module';
import { ViewCdaComponent, CdaDialogContent } from './view-cda/view-cda.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { CriticalSystemComponent,CSDialogContent } from './critical-system/critical-system.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {SpinnerComponent} from './ui-component/spinner.component';
import { MenuItems } from './_helpers/menu-items';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './_helpers/accordion/index';
import { SecurityControlTreeComponent, DialogSelectedElement } from './security-control-tree/security-control-tree.component';
import { ScipComponent, ScipsDialogContent } from './scip/scip.component';
import { WrapTextPipe } from "./_helpers/wrap-text.pipe";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};
import { Inject, Injectable, Optional } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { LoginComponent } from './auth/login/login.component';
import { MsalModule ,MsalInterceptor  } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppBreadcrumbComponent } from './ui-component/breadcrumb/breadcrumb.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthGuard } from './auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './shared/utils';
import { AssessmentsComponent, UserAssessmentListDialogContent } from './assessments/assessments.component';
import { WalkdownComponent , ReviewDialogContent,UserListDialogContent} from './walkdown/walkdown.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AssessmentResultComponent } from './assessments/assessment-result/assessment-result.component';
import { ControlCdaListComponent } from './control-cda-list/control-cda-list.component';

@Injectable()
export class MomentUtcDateAdapter extends MomentDateAdapter {

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
    super(dateLocale);
  }

  //send valid date to backend
  createDate(year: number, month: number, date: number): Moment {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    let result = moment.utc({ year, month, date }).locale(this.locale);

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }
}
//----------------- custom date format
export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    ViewCdaComponent,
    CriticalSystemComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    SpinnerComponent,
    SecurityControlTreeComponent,
    AppBreadcrumbComponent,
// ---------- directives ---------------------
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
// ---------- dilog box ---------------------
    CdaDialogContent,
    CSDialogContent,
    DialogSelectedElement,
    ScipComponent,
    ScipsDialogContent,
    ReviewDialogContent,
    UserListDialogContent,
    UserAssessmentListDialogContent,
//--------pipes--------------------------
     WrapTextPipe,
LoginComponent,
AssessmentsComponent,
WalkdownComponent,
DashboardComponent,
AssessmentResultComponent,
ControlCdaListComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule ,
    MainMaterialModule,
    HttpClientModule,
    MatDialogModule,
    PerfectScrollbarModule,
    //----------active directory 
    MsalModule.forRoot({
      auth: {
        clientId: '25d54303-7773-45fa-af2e-9f5ffafc1aa8', // This is your client ID
        authority:  "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a", // This is your tenant ID
        redirectUri: 'http://localhost:4200/'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
    }, {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({stateKey:'router'}),

    // FlexLayoutModule,
        ChartistModule,
        ChartsModule,
        NgApexchartsModule,
  ],

  
  exports:[
    MainMaterialModule,
    FlexLayoutModule 
  ],
  entryComponents:[CdaDialogContent,CSDialogContent,DialogSelectedElement,ScipsDialogContent,ReviewDialogContent,UserListDialogContent,UserAssessmentListDialogContent],

  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    // ---------- mat date format
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
  },
  {
    provide:RouterStateSerializer,useClass:CustomSerializer
  },

  AuthGuard,
  MenuItems

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 