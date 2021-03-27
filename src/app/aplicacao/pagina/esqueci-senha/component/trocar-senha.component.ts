import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Severity, Summary } from 'src/app/aplicacao/model/Message';
import { UsuarioCadastro } from 'src/app/aplicacao/model/UsuarioCadastro';
import { TrocarSenhaService } from '../service/trocar-senha.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.scss']
})
export class TrocarSenhaComponent implements OnInit {
  
  public view: number;;

 

  public usuario: UsuarioCadastro= new UsuarioCadastro();

  constructor(private route: ActivatedRoute, private router: Router, private trocarSenhaService: TrocarSenhaService, private messageService: MessageService) { }

  ngOnInit(): void {
    let token = this.route.snapshot.params.token;
    if(token == 'agora'){
      this.view = 1;
    }else{
      this.view = 2;
    }
  }

  public validarCadastro() {
    let message: Message[] = this.usuario.validarDadosTrocaSenha();
    if (message.length === 0) {
      this.usuario.email = this.usuario.login;
      console.log(this.usuario.email)
      this.trocarSenhaService.forgotItem(this.usuario).subscribe((Response)=>{
        if(Response['status'] == 'não encontrado'){
          this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: 'Email não encontrado'});
        }else{
          this.messageService.add({ severity: Severity.INFO, summary: Summary.INFO, detail: 'Foi enviado para o email uma instrução' });
        }
        
      },(error) => {                              //Error callback
        // console.error(error)
        this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: error});
        //throw error;   //You can also throw the error to a global error handler
      }) 


      // this.trocarSenhaService.autenticarUsuario(this.usuario).subscribe({
      //   next: result => {
      //     this.view++;
      //     this.usuario = new UsuarioCadastro(result.entity);
      //     this.messageService.add({ severity: Severity.INFO, summary: Summary.INFO, detail: result.message });
      //   }, error: erro => {
      //     this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: erro.error.message });
      //  }
      // });
    } else {
       this.messageService.addAll(message);
   }
    
   }

   public confirmarNovaSenha() {
    let message: Message[] = this.usuario.validarSenha();
    if (message.length === 0) {
      this.trocarSenhaService.trocarSenha(this.usuario).subscribe({
       next: result => {
         this.messageService.add({ severity: Severity.SUCCESS, summary: Summary.SUCCESS, detail: result.message });
         this.router.navigate(['/login']);
       }, error: erro => {
         this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: erro.error.message });
        }
     });
     } else {
       this.messageService.addAll(message);
     }
   }

}
