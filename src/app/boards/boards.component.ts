import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

    public items = [];
    public retroOptions = [];
    public selectedOption;

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {label: 'Create Board', icon: 'fa fa-link', routerLink: ['/boards/createBoard']},
            {label: 'Help', icon: 'fa fa-paint-brush', routerLink: ['/boards/help']}];
        this.retroOptions = [
            {name: 'Active', code: 'active'},
            {name: 'Archived', code: 'archived'},
        ];
    }

}
