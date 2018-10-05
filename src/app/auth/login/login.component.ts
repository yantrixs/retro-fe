import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'ng2-ui-auth';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../service/common.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public isSubmitted = false;
    private routerToken;
    private boardName;
    constructor(private fb: FormBuilder, private authService: AuthService,
                private router: Router, private activatedRoute: ActivatedRoute,
                private commonService: CommonService) {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log(params);
            this.routerToken = params.token;
            this.boardName = params.boardName;
        });
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
                if (this.boardName) {
                    this.router.navigateByUrl('boards/board', this.boardName);
                } else {
                    this.router.navigateByUrl('boards');
                }
            });
        }
    }

    public onClearForm(): void {
        this.loginForm.reset();
    }
}
