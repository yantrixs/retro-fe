import { LoginComponent } from "./auth/login/login.component";
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

const MODULE_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'boards',
        loadChildren: './boards/boards.module#BoardsModule'
    }
]

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(MODULE_ROUTES);
