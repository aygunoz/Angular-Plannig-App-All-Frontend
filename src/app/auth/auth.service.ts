import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    console.log('deneme girdi4')
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX0ZB5KwZ3ohrlPh-UyO8REP9zUounB6A',
      {email, password, returnSecureToken: true})
      .pipe(catchError(this.handleError), tap(resDate => {
        this.handleAuthentication(resDate.email, resDate.localId, resDate.idToken, +resDate.expiresIn);
      }));
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX0ZB5KwZ3ohrlPh-UyO8REP9zUounB6A',
      {email, password, returnSecureToken: true})
      .pipe(catchError(this.handleError), tap(resDate => {
        this.handleAuthentication(resDate.email, resDate.localId, resDate.idToken, +resDate.expiresIn);
      }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    console.log(expirationDate);
    const user = new UserModel(
      email,
      userId,
      token,
      expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error eccurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorRes);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exits already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exits';
        break;
      case 'EMAIL_INVALID':
        errorMessage = 'This password is not correct';
        break;

    }
    return throwError(errorMessage);
  }
}
