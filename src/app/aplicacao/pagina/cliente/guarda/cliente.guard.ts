import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Severity, Summary } from 'src/app/aplicacao/model/Message';
import { StorageService } from 'src/app/aplicacao/service/storage/storage.service';

@Injectable()
export class ClienteGuard implements CanActivate {

  constructor(private router: Router, private messageService: MessageService, private storage: StorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const a = this.storage.usuarioLogado();
    const b = this.storage.getAuthorities();
    console.log(a, b); 
    if (this.storage.usuarioLogado() == true && this.storage.getAuthorities() == 'cliente') {
      return true; 
    } else {
      this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: 'Erro de autenticação de rota, contate o administrador do sistema' });
      this.storage.removeUser();
      this.router.navigate(['']);
      return false;
    }
  }
}
