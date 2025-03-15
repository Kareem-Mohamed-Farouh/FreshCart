import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  specialCar: string = '@';
  isLoading: boolean = false;

  //function Injection
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // ======== cntrol Form=======
  // [formGroup -- formControle]

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    //******************************* */
    // ********************************
    //validatorOrOption
    //menha=> custome Validation
    { validators: [this.confirmPassword] } //updateOn: 'submit'
    // ****not prefared for me********'''''updateOn: 'submit'''' => //errors// لما تعمل سبميت يبداء يظهرلك  ومايشيلش الايرور برضوا الا لما تعمل سبميت ال  ********************
    // ***************************
  );

  submitForm(): void {
    if (this.registerForm.valid) {
      (this.isLoading = true),
        this.authService.sendRegiserForm(this.registerForm.value).subscribe({
          next: (res) => {
            // console.log(res);

            if (res.message === 'success') {
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 100);
            }
            this.isLoading = false;
          }
        });
      // console.log(this.registerForm.value);  result==> {  "name": "kareems",  "email": "aadd@gmail.com",  "password": "Asssssss",  "rePassword": "Asssssss",    "phone": "01122200553" }
    } else {
      // methode  markAllAsTouched();
      this.registerForm.markAllAsTouched();
    }
  }

  //  AbstractControl ==>  base class==>(formControl -formGroup)
  // best way to make  custome Validation
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;

    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }
}
