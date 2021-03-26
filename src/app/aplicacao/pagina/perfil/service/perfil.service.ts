import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ResponseClient } from 'src/app/aplicacao/model/ResponseClient';
import { UsuarioCadastro } from 'src/app/aplicacao/model/UsuarioCadastro';
import { Http } from 'src/app/aplicacao/service/http/Http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends Http {

  private api = `${this.server}/usuario`;
  base_path = `${this.server}/usuario`;

  constructor(private http: HttpClient) {
    super();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getItem(id): Observable<ResponseClient> {
    return this.http
      .get<ResponseClient>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateItem(id, item): Observable<ResponseClient> {
    return this.http
      .put<ResponseClient>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateSenha(id, item): Observable<ResponseClient> {
    return this.http
      .put<ResponseClient>(this.base_path + '/user/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  public infoUsuario(userLogin: string): Observable<ResponseClient> {
    return this.http.get<ResponseClient>(`${this.api}`);
  }

  public atualizarCadastro(usuario: UsuarioCadastro): Observable<ResponseClient> {
    return this.http.put<ResponseClient>(`${this.api}`, usuario);
  }

  public atualizarSenha(usuario: UsuarioCadastro): Observable<ResponseClient> {
    return this.http.put<ResponseClient>(`${this.api}/senha`, usuario);
  }

}
