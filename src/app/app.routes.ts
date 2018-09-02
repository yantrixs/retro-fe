import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const MODULE_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'boards',
        loadChildren: './boards/boards.module#BoardsModule'
    }
];

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(MODULE_ROUTES);
