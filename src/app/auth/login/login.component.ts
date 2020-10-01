import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service'
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login } from '../auth.actions';
import { IUser,Role } from '../../_models/user.interface';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any
  error: any;
  public form: FormGroup;
  constructor(
     private fb: FormBuilder,
     private router: Router,
     private store:Store<AppState>,
     private authService:AuthService,
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }
  get f() { return this.form.controls; }


  onSubmit() {
    console.log(this.form.value);
    this.data = this.authService.login(this.f.username.value, this.f.password.value)
    if(this.data == 'user not exist'){
      console.log('error')
    }else{
      this.store.dispatch(new Login({user:this.data}))
      this.router.navigateByUrl('/dashboard')
    }
    
  }
}
