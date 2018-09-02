import {Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ModuleWithProviders } from '@angular/core';
import {LoginComponent} from './login/login.component';

const ROUTERS: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

export const AUTH_ROUTER: ModuleWithProviders = RouterModule.forChild(ROUTERS);
