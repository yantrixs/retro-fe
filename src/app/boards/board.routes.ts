import {Routes, RouterModule} from '@angular/router';
import {BoardsComponent} from './boards.component';
import {ModuleWithProviders} from '@angular/core';
import {CreateComponent} from './create/create.component';
import {BoardCatalogComponent} from './board-catalog/board-catalog.component';

const ROUTES: Routes = [
    {
        path: '',
        component: BoardsComponent
    },
    {
        path: 'add',
        component: CreateComponent
    },
    {
        path: 'board/:name',
        component: BoardCatalogComponent
    }
];

export const BOARD_ROUTES: ModuleWithProviders = RouterModule.forChild(ROUTES);
