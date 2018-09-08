import {Component, OnInit} from '@angular/core';
import {RetroService} from '../../service/retro.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    constructor(private retroService: RetroService) {
    }

    ngOnInit() {
        this.retroService.getBoardTemplates().subscribe((templates) => {
            console.log('templates  ', templates);
        });
    }

}
