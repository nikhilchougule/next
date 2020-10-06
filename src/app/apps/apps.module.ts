import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { MailComponent, DialogDataExampleDialogComponent } from './mail/mail.component';
import { TicketlistComponent, TicketDialogContent } from './ticketlist/ticketlist.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MainMaterialModule } from '../main-material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuillModule } from 'ngx-quill';
import { CalendarModule, DateAdapter, CalendarDateFormatter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [CalendarComponent, TaskboardComponent, MailComponent, TicketlistComponent, TicketdetailsComponent,
  TicketDialogContent,
  DialogDataExampleDialogComponent
],
  imports: [
    CommonModule,
    AppsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
    }),
    FlexLayoutModule,
    QuillModule.forRoot(),
   NgApexchartsModule,
    PerfectScrollbarModule,
    Ng2SearchPipeModule,
    DragDropModule,
    NgxPaginationModule,
    CKEditorModule,
    MainMaterialModule
  ],
  entryComponents: [TicketDialogContent,DialogDataExampleDialogComponent]

})
export class AppsModule { }
