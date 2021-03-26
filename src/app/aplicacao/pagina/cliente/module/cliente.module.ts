import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeClienteComponent } from '../home-cliente/home-cliente.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteRoutingModule } from '../route/cliente.routing.model';
import { HttpInterceptorAuthenticate } from 'src/app/aplicacao/service/http/interceptor';


@NgModule({
  declarations: [HomeClienteComponent],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ClienteRoutingModule,
    
  ],
  providers: [HttpInterceptorAuthenticate]
})
export class ClienteModule { }
