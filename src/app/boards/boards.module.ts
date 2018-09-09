import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardsComponent} from './boards.component';
import {BOARD_ROUTES} from './board.routes';
import {ButtonModule} from 'primeng/button';
import {DropdownModule, SplitButtonModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { UserBoardsComponent } from './user-boards/user-boards.component';
import { CardsComponent } from './cards/cards.component';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BOARD_ROUTES,
        ButtonModule,
        SplitButtonModule,
        DropdownModule,
        ListboxModule,
        ReactiveFormsModule
    ],
    declarations: [BoardsComponent, CreateComponent, UserBoardsComponent, CardsComponent]
})
export class BoardsModule {
}
