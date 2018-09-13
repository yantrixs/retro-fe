import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppCustomPreLoader} from './service/custom-preload.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardService} from './service/auth-guard.service';

const MODULE_ROUTES: Routes = [
    {
        path: '',
        // component: HomeComponent,
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
        data: {preload: true, delay: true}
    },
    {
        path: 'boards',
        loadChildren: './boards/boards.module#BoardsModule',
        data: {preload: false, delay: false},
        canActivate: [AuthGuardService]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(MODULE_ROUTES, {preloadingStrategy: AppCustomPreLoader});
