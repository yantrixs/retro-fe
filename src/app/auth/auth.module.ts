import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AUTH_ROUTER} from './auth.route';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RetroService} from '../service/retro.service';
import {LoginComponent} from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    imports: [
        CommonModule,
        AUTH_ROUTER,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    declarations: [LoginComponent, RegisterComponent, LogoutComponent],
    providers: [RetroService]
})
export class AuthModule {
}
