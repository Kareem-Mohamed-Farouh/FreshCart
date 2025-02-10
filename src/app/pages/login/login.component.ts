import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  specialCar: string = '@';
  isload: boolean = true;
  isLoading: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  //**********refactoring***********
  loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.email, Validators.required]],
    password: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
    ],
  });

  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.email, Validators.required]),
  //   password: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^[A-Z]\w{7,}$/),
  //   ]),
  // });
  submitForm() {
    if (this.loginForm.valid) {
      (this.isLoading = true), (this.isload = false);
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            // 1- Save token
            // 1- Save   token  in locall storage But isnot best way
            //but the best is cookies
            setTimeout(() => {
              localStorage.setItem('token', res.token);
              this.authService.getUserData();
              this.router.navigate(['/home']);
            }, 700);
            this.isLoading = false;
            this.isload = true;

            // programing routing
            // console.log(res.token);
          } else {
            this.isLoading = true;
            console.log(res.error);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    }
  }
}
