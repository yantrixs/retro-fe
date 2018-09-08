import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from 'ng2-ui-auth';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public isSubmitted = false;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
                private commonService: CommonService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            usernameOrEmail: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    public login() {
        this.isSubmitted = true;
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe((resp) => {
                this.authService.setToken(resp.accessToken);
                this.commonService.setLoggedUserInfo(this.authService.getPayload());
            }, (error) => {
                console.log('Error is', error);
            }, () => {
                this.router.navigateByUrl('boards');
            });
        }
    }

    public onClearForm(): void {
        this.loginForm.reset();
    }
}
