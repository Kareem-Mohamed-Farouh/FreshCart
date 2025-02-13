import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss',
})
export class ForgetPassComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step: number = 1;
  isNotValidemail = false;

  verifyEmail: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyCode: FormGroup = this.formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{6}$/)]],
  });

  resetPassword: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
    ],
  });

  isload: boolean = true;
  isLoading: boolean = false;
  onVerifyEmail() {
    // submite  get value vaaalue of email and store in variable then
    // send value to other form by select input of eimail and put vale by Method =>patchValue

    let myEmail = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(myEmail);

    this.isLoading = true;
    if (this.verifyEmail.valid) {
      this.authService.forgetPassword(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusMsg === 'success') {
            this.step = 2;
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = true;
          console.log(err.error.message);
          this.isLoading = false;
        },
      });
    }
  }

  onVerifyCode() {
    this.isLoading = true;
    if (this.verifyCode.valid) {
      this.authService.verifyResetCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
          if (res.status === 'Success') {
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = true;
          console.log(err.error.message);
          this.isLoading = false;
        },
      });
    }
  }

  onResetPass() {
    if (this.resetPassword.valid) {
      this.authService.resetPasswordd(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);

          localStorage.setItem('token', res.token);
          this.authService.getUserData();
          this.router.navigate(['/home']);

          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = true;
          console.log(err.error.message);
          this.isLoading = false;
        },
      });
    }
  }
}
