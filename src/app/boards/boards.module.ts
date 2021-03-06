import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardsComponent} from './boards.component';
import {BOARD_ROUTES} from './board.routes';
import {ButtonModule} from 'primeng/button';
import {CardModule, ChipsModule, DialogModule, DropdownModule, SplitButtonModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateComponent} from './create/create.component';
import {UserBoardsComponent} from './user-boards/user-boards.component';
import {CategoryComponent} from './category/category.component';
import {ListboxModule} from 'primeng/listbox';
import {BoardCatalogComponent} from './board-catalog/board-catalog.component';
import {RetroDropComponent} from '../component/retro-drop.component';
import {CardComponent} from './card/card.component';
import { ManageMemberComponent } from './manage-member/manage-member.component';
import {AutoFocusDirective} from '../directive/auto-focus.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BOARD_ROUTES,
        ButtonModule,
        SplitButtonModule,
        DropdownModule,
        ListboxModule,
        ReactiveFormsModule,
        DialogModule,
        CardModule,
        ChipsModule
    ],
    declarations: [BoardsComponent,
        CreateComponent,
        UserBoardsComponent,
        CategoryComponent,
        BoardCatalogComponent,
        RetroDropComponent,
        CardComponent,
        ManageMemberComponent,
        AutoFocusDirective
    ]
})
export class BoardsModule {
}
