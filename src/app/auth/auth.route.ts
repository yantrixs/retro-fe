import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';

const ROUTERS: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    }
];

export const AUTH_ROUTER: ModuleWithProviders = RouterModule.forChild(ROUTERS);
