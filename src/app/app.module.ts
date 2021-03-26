import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenuFixModule } from './aplicacao/component/menu/module/menu.module';
import { AutenticacaoGuard } from './aplicacao/guarda/autenticacao.guard';
import { ClienteGuard } from './aplicacao/pagina/cliente/guarda/cliente.guard';
import { ProfissionalGuard } from './aplicacao/pagina/profissional/guarda/profissional.guard';
import { AdministradorGuard } from './aplicacao/pagina/administrador/guarda/administrador.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CommonModule,

    BrowserModule,
    BrowserAnimationsModule,

    MenuFixModule,

    ToastModule,

    AppRoutingModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [MessageService, AutenticacaoGuard, ClienteGuard, ProfissionalGuard, AdministradorGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
