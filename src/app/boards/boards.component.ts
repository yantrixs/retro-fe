import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

    public items = [];
    public retroOptions = [];
    public selectedOption;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.items = [
            {label: 'Create Board', icon: 'fa fa-link', routerLink: ['/boards/add']},
            {label: 'Help', icon: 'fa fa-paint-brush', routerLink: ['/boards/help']}];
        this.retroOptions = [
            {name: 'Active', code: 'active'},
            {name: 'Archived', code: 'archived'},
        ];
    }

    public addNewBoard(): void {
        this.router.navigateByUrl('/boards/add');
    }

}
