import { Component, OnInit } from '@angular/core';
import { ScipService } from './_services/scip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data ;
  constructor(private profile :ScipService) {
  
   }

   ngOnInit() {
    // this.login();

   }

  login() {
      //  this.authService.loginPopup({
      //     extraScopesToConsent: ["user.read", "openid", "profile"]
      //   });
      // const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

      // if (isIE) {
      //   console.log(isIE)
      //   this.authService.loginRedirect({
      //     extraScopesToConsent: ["user.read", "openid", "profile"]
      //   });
      // } else {
      //   this.authService.loginPopup({
      //     extraScopesToConsent: ["user.read", "openid", "profile"]
      //   });
      // }
  }
  getProfile(){
    this.profile.getProfile().subscribe((res)=>{
      console.log(res)
    })
  }
}