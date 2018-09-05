import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardsComponent} from './boards.component';
import {BOARD_ROUTES} from './board.routes';
import {ButtonModule} from 'primeng/button';
import {DropdownModule, SplitButtonModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BOARD_ROUTES,
        ButtonModule,
        SplitButtonModule,
        DropdownModule
    ],
    declarations: [BoardsComponent]
})
export class BoardsModule {
}
