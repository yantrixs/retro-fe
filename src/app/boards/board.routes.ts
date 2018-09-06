import {Routes, RouterModule} from '@angular/router';
import {BoardsComponent} from './boards.component';
import {ModuleWithProviders} from '@angular/core';
import {CreateComponent} from './create/create.component';

const ROUTES: Routes = [
    {
        path: '',
        component: BoardsComponent
    },
    {
        path: 'add',
        component: CreateComponent
    }
];

export const BOARD_ROUTES: ModuleWithProviders = RouterModule.forChild(ROUTES);
