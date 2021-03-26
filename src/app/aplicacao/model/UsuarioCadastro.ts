import { NodeWithI18n } from "@angular/compiler";
import { Message } from "primeng/api";
import { EnumTipoAcesso } from "src/app/aplicacao/model/EnumTipoAcesso";
import { LoginComponent } from "../pagina/login/component/login.component";
import { Severity, Summary } from "./Message";
import { Utils } from "./Utils";

export class UsuarioCadastro {

    private regex: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    login: string;
    senha: string
    confirmarSenha: string;
    novaSenha:string;
    telefone: string;
    endereco: string;
    tipoAcesso: EnumTipoAcesso;
    ativo: boolean;

     public constructor(init?: Partial<UsuarioCadastro>) {
         Object.assign(this, init);
    }

     validarDados(): Message[] {
         let messages: Message[] = [];
        if (this.nome === null || this.nome === undefined || this.nome === '') {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Nome' não foi preenchido" });
        }
        if (this.cpf === null || this.cpf === undefined || this.cpf === '' || !Utils.cpfValido(this.cpf)) {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Cpf' não foi preenchido ou não é válido" });
        }
         if (this.dataNascimento === null || this.dataNascimento === undefined) {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Data de nascimento' não foi preenchido" });
        }
        if (this.endereco === null || this.endereco === undefined || this.endereco === '') {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'endereço' não foi preenchido" });
         }
         if (this.telefone === null || this.telefone === undefined || this.telefone === '') {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'telefone' não foi preenchido" });
        }
        if (this.login === null || this.login === undefined || this.login === '' || !this.regex.test(this.login)) {
            messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo login não foi preenchido ou está com informação invalida" });
         }
         return messages;
     }

     validarInclusaoDadosAdm(): Message[] {
        let messages: Message[] = [];
         if (this.nome === null || this.nome === undefined || this.nome === '') {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Nome' não foi preenchido" })
         }
       if (this.login === null || this.login === undefined || this.login === '' || !this.regex.test(this.login)) {
            messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo login não foi preenchido ou está com informação invalida" });
        }
        if (this.cpf !== null && this.cpf !== undefined && this.cpf !== '' && !Utils.cpfValido(this.cpf)) {
            messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Cpf' não foi preenchido ou não é válido" });
        }
        if (messages.length === 0) {
            return this.validarSenha();
        } else {
           return messages
         }
     }

     validarAlteracaoDadosAdm(): Message[] {
         let messages: Message[] = [];
         if (this.nome === null || this.nome === undefined || this.nome === '') {
            messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Nome' não foi preenchido" })
         }
         if (this.login === null || this.login === undefined || this.login === '' || !this.regex.test(this.login)) {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo login não foi preenchido ou está com informação invalida" });
         }
         if (this.dataNascimento !== null && this.dataNascimento !== undefined && this.validarDataNascimento() ) {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Data de nascimento' está invalido" });
        }
        return messages
     }

    validarDadosTrocaSenha(): Message[] {
         let messages: Message[] = [];
        if (this.telefone === null || this.telefone === undefined || this.telefone === '') {
            messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'telefone' não foi preenchido" })
       }
      if (this.login === null || this.login === undefined || this.login === '' || !this.regex.test(this.login)) {
            messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo login não foi preenchido ou está com informação invalida" });
         }
         return messages;
    }

     validarSenha(): Message[] {
         let messages: Message[] = [];
         if (this.senha === null || this.senha === undefined || this.senha === '') {
           messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Senha' não foi preenchido" })
         }
        if (this.confirmarSenha === null || this.confirmarSenha === undefined || this.confirmarSenha === '') {
            messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Confirma senha' não foi preenchido" });
        }
        if (this.senha === this.confirmarSenha || this.confirmarSenha === this.senha) {
        } else {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "Confirma senha não confere" });
        }
         return messages;
     }

     validarNovaSenha(): Message[] {
         let messages: Message[] = [];
        if (this.senha === null || this.senha === undefined || this.senha === '') {
            messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Senha' não foi preenchido" })
         }
        if (this.novaSenha === null || this.novaSenha === undefined || this.novaSenha === '') {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Nova senha' não foi preenchido" });
         }
        if (this.confirmarSenha === null || this.confirmarSenha === undefined || this.confirmarSenha === '') {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "O campo 'Confirma senha' não foi preenchido" });
        }

        if (this.novaSenha === this.confirmarSenha || this.confirmarSenha === this.novaSenha) {
         } else {
             messages.push({ severity: Severity.ERROR, summary: Summary.ERROR, detail: "Confirma senha não confere" });
         }
        return messages;
     }

    formatarData() {
         if (this.dataNascimento !== null && this.dataNascimento !== undefined) {
            let novaData: Date = new Date();
            let value: string[] = this.dataNascimento.toString().split("-");
            novaData.setFullYear(Number.parseInt(value[0]), Number.parseInt(value[1]) - 1, Number.parseInt(value[2]));
             this.dataNascimento = novaData;
       }
     }

     private validarDataNascimento() {
         let now = new Date();
         now.setHours(0, 0, 0, 0);
        this.dataNascimento.setHours(0, 0, 0, 0);
        if (this.dataNascimento >= now || this.dataNascimento.getFullYear() > (now.getFullYear() - 18)) {
             return true;
       } else {
           return false;
         }
     }

}