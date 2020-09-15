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
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};
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
// ---------- directives ---------------------
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
// ---------- dilog box ---------------------
    CdaDialogContent,
    CSDialogContent,
    DialogSelectedElement,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainMaterialModule,
    HttpClientModule,
    MatDialogModule,
    PerfectScrollbarModule
  ],
  exports:[
    MainMaterialModule,
   
  ],
  entryComponents:[CdaDialogContent,CSDialogContent,DialogSelectedElement],

  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    MenuItems

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
