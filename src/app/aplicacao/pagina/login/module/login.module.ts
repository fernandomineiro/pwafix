import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../component/login.component';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from '../route/login.routing.model';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../service/login.service';

import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [LoginComponent],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    InputTextModule,

    LoginRoutingModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
