import { Routes, RouterModule } from "@angular/router";
import { BoardsComponent } from "./boards.component";
import { ModuleWithProviders } from "@angular/core";

const ROUTES: Routes = [
    {
        path: '',
        component: BoardsComponent
    }
]

export const BOARD_ROUTES: ModuleWithProviders = RouterModule.forChild(ROUTES);