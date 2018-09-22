import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RetroService} from '../service/retro.service';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
    public savedUserBoards = [];
    public items = [];
    public retroOptions = [];
    public selectedOption;

    constructor(private router: Router, private retroService: RetroService) {
    }

    ngOnInit() {
        this.items = [
            {label: 'Create Board', icon: 'fa fa-link', routerLink: ['/boards/add']},
            {label: 'Help', icon: 'fa fa-paint-brush', routerLink: ['/boards/help']}];
        this.retroOptions = [
            {name: 'Active', code: 'active'},
            {name: 'Archived', code: 'archived'},
        ];

        this.retroService.getSavedUserBoards().subscribe((res) => {
            this.savedUserBoards = res['body'].userOwnBoards;
            console.log('this.savedUserBoards     ', this.savedUserBoards);
        }, (err) => {
            console.log('Error Message   ', err);
        }, () => {
            // complete action.
        });
    }

    public addNewBoard(): void {
        this.router.navigateByUrl('/boards/add');
    }

}
