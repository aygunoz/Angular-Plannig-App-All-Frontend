import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMood() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {
    } else {
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
      }, errorRes => {
        console.log(errorRes);
        this.error = errorRes;
        this.isLoading = false;
      });
      authForm.reset();
    }
  }
}
