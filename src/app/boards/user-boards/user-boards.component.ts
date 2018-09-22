import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-user-boards',
    templateUrl: './user-boards.component.html',
    styleUrls: ['./user-boards.component.css']
})
export class UserBoardsComponent implements OnInit {
    @Input() savedBoards = [];
    public showDropDownItems = false;
    public tableOptions = [{
        label: 'a', isDivider: true
    }, {label: 'b'}, {label: 'c'}];

    constructor() {
    }

    ngOnInit() {

    }

    public showDropItems() {
        this.showDropDownItems = !this.showDropDownItems;
    }
}
