import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeProfissionalComponent } from '../home-profissional/home-profissional.component';
import { ProfissionalRoutingModule } from '../route/Profissional.routing.module';
import { HttpInterceptorAuthenticate } from 'src/app/aplicacao/service/http/interceptor';



@NgModule({
  declarations: [ HomeProfissionalComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProfissionalRoutingModule
  ], 
  providers: [HttpInterceptorAuthenticate]
})
export class ProfissionalModule { }
