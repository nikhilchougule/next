import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { MailComponent } from './mail/mail.component';
import { TicketlistComponent } from './ticketlist/ticketlist.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'calendar',
        component:CalendarComponent,
        data:{
          title:'Calendar',
          urls:[
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Calendar' }
          ]
        }
      },
      {
        path: 'messages',
        component:MailComponent,
        data: {
            title: 'Email',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Email' }
            ]
        }
    },
    {
      path: 'taskboard',
      component: TaskboardComponent,
      data: {
          title: 'Taskboard',
          urls: [
              { title: 'Dashboard', url: '/dashboard' },
              { title: 'Taskboard' }
          ]
      }
  },
  {
    path: 'ticketlist',
    component: TicketlistComponent,
    data: {
        title: 'Ticket List',
        urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Ticket List' }
        ]
    }
},
{
    path: 'ticketdetails',
    component: TicketdetailsComponent,
    data: {
        title: 'Ticket Details',
        urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Ticket Details' }
        ]
    }
},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
