import {Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ModuleWithProviders } from '@angular/core';

const ROUTERS: Routes = [
    {
        path: '',
        component: RegisterComponent
    }
]

export const AUTH_ROUTER: ModuleWithProviders = RouterModule.forChild(ROUTERS);