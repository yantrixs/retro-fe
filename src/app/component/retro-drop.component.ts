import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-drop-down',
    templateUrl: './drop-down.html',
    styleUrls: ['./drop-down.css']
})
export class RetroDropComponent implements OnInit {
    @Input() dropDownList;
    @Input() isOpen = false;

    ngOnInit(): void {
    }

}
