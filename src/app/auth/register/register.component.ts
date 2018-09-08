import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RetroService } from '../../service/retro.service';
import { Util } from '../../util/app.util';
import { Subscriber } from 'rxjs';
import { User } from '../../app.interface';
import { PasswordValidation } from '../../validations/password.validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public isSubmitted = false;
  public registerForm: FormGroup;
  public isParamsEmpty;
  private routerParams;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private retroService: RetroService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.routerParams = params.token;
    });
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
        validator: PasswordValidation.matchPassword
      });
    this.isParamsEmpty = Util.isObjectEmpty(this.routerParams);
    if (this.isParamsEmpty) {
      this.registerForm.controls['password'].clearValidators();
      this.registerForm.controls['confirmPassword'].clearValidators();
    } else {
      this.registerForm.controls['password'].setValidators([Validators.required]);
      this.registerForm.controls['password'].updateValueAndValidity();
      // update controls
      this.registerForm.controls['confirmPassword'].setValidators([Validators.required]);
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      this.retroService.getUserInfo(this.routerParams).subscribe((res) => {
        const user = res['body'];
        this.populateFormData(user);
      });
    }
  }

  public doRegister(): void {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      if (this.isParamsEmpty) {
        this.retroService.registerNewUser(this.registerForm.value).subscribe((res) => {
          console.log(res);
          this.isSubmitted = false;
        }, (error) => {
          console.log('Confirm Registration is Faild;');
          this.isSubmitted = false;
        });
      } else {
        let user = {} as User;
        user = this.registerForm.value as User;
        user.email = this.registerForm.get('email').value;
        this.retroService.completeUserRegistration(this.registerForm.value).subscribe((res) => {
          console.log(res);
          this.isSubmitted = false;
        }, (error) => {
          console.log('Register ', error);
          this.isSubmitted = false;
        }, () => {
          this.router.navigateByUrl('../');
        });
      }
    }
  }



  private populateFormData(user: User) {
    this.registerForm.get('firstName').setValue(user.firstName);
    this.registerForm.get('lastName').setValue(user.lastName);
    this.registerForm.get('email').setValue(user.email);
    this.registerForm.get('email').disable();
  }
}
