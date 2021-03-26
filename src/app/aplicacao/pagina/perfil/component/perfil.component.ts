import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Severity, Summary } from 'src/app/aplicacao/model/Message';
import { UsuarioCadastro } from 'src/app/aplicacao/model/UsuarioCadastro';
import { StorageService } from 'src/app/aplicacao/service/storage/storage.service';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public view: number = 1;
  id:any;

  public usuario: UsuarioCadastro = new UsuarioCadastro();

  constructor(private perfilService: PerfilService, private storageService: StorageService, private messageService: MessageService) { }

  public viewAlterarDados() {
    this.view = 1;
  }

  public viewTrocarSenha() {
    this.view = 2;
  } 

  ngOnInit(): void {
    const id = this.storageService.idusuario();
    console.log(id)

    this.perfilService.getItem(id).subscribe((response)=>{
      console.log(response['resposta'][0])
      this.usuario.nome = response['resposta'][0].name;
      this.usuario.dataNascimento = response['resposta'][0].date;
      this.usuario.cpf = response['resposta'][0].cpf;
      this.usuario.endereco = response['resposta'][0].endereco;
      this.usuario.telefone = response['resposta'][0].tell;
      this.usuario.login = response['resposta'][0].email;
      
      this.usuario.formatarData();
    })


    // this.perfilService.infoUsuario(id).subscribe({
    //   next: result => {
    //     console.log(result);
    //     // this.usuario = new UsuarioCadastro(result.entity);
    //     // this.usuario.formatarData();
    //   }, error: erro => {
    //     console.log(erro);
    //     this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: erro.error.message });
    //   }, complete: () => {
    //   }
    // });
  }

   public alterarCadastro() {
     let message: Message[] = this.usuario.validarDados();
     if (message.length === 0) {
      const id = this.storageService.idusuario();
      this.perfilService.updateItem(id, this.usuario).subscribe((response)=>{
        // console.log(response);
        this.messageService.add({ severity: Severity.SUCCESS, summary: Summary.SUCCESS, detail: 'Atualizado com sucesso' });
      },(error) => {                              //Error callback
        // console.error(error)
        this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: error });
        //throw error;   //You can also throw the error to a global error handler
      })

  //     this.perfilService.atualizarCadastro(this.usuario).subscribe({
  //       next: result => {
  //         console.log(result);
  //         this.messageService.add({ severity: Severity.SUCCESS, summary: Summary.SUCCESS, detail: result.message });
  //       }, error: erro => {
  //         console.log(erro);
  //         this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: erro.error.message });
  //       }
  //     });
    } else {
       this.messageService.addAll(message);
     }
   }

   public alterarSenha() {
    let message: Message[] = this.usuario.validarNovaSenha();
    const id = this.storageService.idusuario();
     if (message.length === 0) {
       this.perfilService.updateSenha(id, this.usuario).subscribe((response)=>{
        // console.log(response);
        this.messageService.add({ severity: Severity.SUCCESS, summary: Summary.SUCCESS, detail: 'Senha atualizada com sucesso' });
      },(error) => {                              //Error callback
        // console.error(error)
        this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: error });
        //throw error;   //You can also throw the error to a global error handler
      })
  //     this.perfilService.atualizarSenha(this.usuario).subscribe({
  //       next: result => {
  //         console.log(result);
  //         this.usuario = result.entity;
  //         this.messageService.add({ severity: Severity.SUCCESS, summary: Summary.SUCCESS, detail: result.message });
  //       }, error: erro => {
  //         console.log(erro);
  //         this.messageService.add({ severity: Severity.ERROR, summary: Summary.ERROR, detail: erro.error.message });
  //       }
  //     });
    } else {
       this.messageService.addAll(message);
     }
   }

}
