import { Injectable } from '@angular/core';
import { Storage } from '../../model/Storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private removeToken() {
    window.sessionStorage.removeItem(Storage.TOKEN_JWT);
  }

  private set token(token: string) {
    window.sessionStorage.removeItem(Storage.TOKEN_JWT);
    window.sessionStorage.setItem(Storage.TOKEN_JWT, token);
  }

  private get token() {
    return window.sessionStorage.getItem(Storage.TOKEN_JWT);
  }

  private removeLogin() {
    window.sessionStorage.removeItem(Storage.USER_LOGIN);
  }

  private set login(login: string) {
    window.sessionStorage.removeItem(Storage.USER_LOGIN);
    window.sessionStorage.setItem(Storage.USER_LOGIN, login);
  }

  private get login() {
    return window.sessionStorage.getItem(Storage.USER_LOGIN);
  }
  
  private removeAuthorities() {
    window.sessionStorage.removeItem(Storage.AUTHORITIES);
  }

  private set authorities(authorities: any) {
    window.sessionStorage.removeItem(Storage.AUTHORITIES);
    window.sessionStorage.setItem(Storage.AUTHORITIES, authorities.authority);
  }

  private get authorities() {
    return window.sessionStorage.getItem(Storage.AUTHORITIES);
  }

  public saveUser(user: any, token: any, authorities: any, id:any) {
    localStorage.setItem('login', user); 
    localStorage.setItem('token',token);
    localStorage.setItem('authorities', authorities);
    localStorage.setItem('idusuario', id);
  }

  public removeUser() {
    // this.removeToken();
    // this.removeLogin();
    // this.removeAuthorities();
    localStorage.clear();
  }

  public usuarioLogado(): any {
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  public getToken(): any {
    return localStorage.getItem('token');
  }

  public idusuario(): any {
    return localStorage.getItem('idusuario');
  }

  public getLogin(): any {
    return localStorage.getItem('login');
  }

  public getAuthorities(): any {
    return localStorage.getItem('authorities');
  }

}
