import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards.component';
import { BOARD_ROUTES } from './board.routes';

@NgModule({
  imports: [
    CommonModule,
    BOARD_ROUTES
  ],
  declarations: [BoardsComponent]
})
export class BoardsModule { }
