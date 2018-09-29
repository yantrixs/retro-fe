import {Routes, RouterModule} from '@angular/router';
import {BoardsComponent} from './boards.component';
import {ModuleWithProviders} from '@angular/core';
import {CreateComponent} from './create/create.component';
import {BoardCatalogComponent} from './board-catalog/board-catalog.component';
import {ManageMemberComponent} from './manage-member/manage-member.component';

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
    },
    {
        path: 'board/:name/manageMember',
        component: ManageMemberComponent
    }
];

export const BOARD_ROUTES: ModuleWithProviders = RouterModule.forChild(ROUTES);
