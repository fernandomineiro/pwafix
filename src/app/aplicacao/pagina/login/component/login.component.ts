import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Severity, Summary } from 'src/app/aplicacao/model/Message';
import { StorageService } from 'src/app/aplicacao/service/storage/storage.service';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-fix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: UsuarioLogin = new UsuarioLogin();

  constructor(private router: Router, private storageService: StorageService, private loginService: LoginService, private messageService: MessageService) { }

  public ngOnInit(): void {
  }

  public realizarLogin() {
    let result: Message[] = this.usuario.autenticarDados();
    if (result.length === 0) {
    var resu = '/cliente'  
     this.loginService.LoginItem(this.usuario).subscribe((response)=>{
       console.log(response);
       if(response['acesso'] == 1){
         var r = 'cliente';
       }
       
       this.storageService.saveUser(response['auth'], response['accessToken'], r, response['id']);
       this.router.navigate([resu]);

     },(error) => {                              //Error callback
      // console.error(error)
      this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: 'Usuário não encontrado'});
      //throw error;   //You can also throw the error to a global error handler
    })
      // this.loginService.autenticarUsuario(this.usuario).subscribe({
      //   next: result => {
      //     console.log(result);
      //     this.storageService.saveUser(result.login, result.token, result.authorities);
      //     this.router.navigate([result.rota]);
      //   }, error: erro => {
      //     console.log(erro);
      //     this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: erro.error.message })
      //   }, complete: () => {
      //   }
      // });
    } else {
      this.messageService.addAll(result);
    }
  }

}
