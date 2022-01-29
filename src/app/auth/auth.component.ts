import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMood() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    console.log('deneme girdi1')
    if (!authForm.valid) {
      this.isLoading = false;
      console.log('deneme girdi2')
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    } else {
      console.log('deneme girdi3')
      authObs = this.authService.signup(email, password);
      authForm.reset();
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/recipes']);
      this.isLoading = false;
    }, errorRes => {
      console.log(errorRes);
      this.error = errorRes;
      this.isLoading = false;
    });
  }
}
