import {Component, OnInit} from '@angular/core';
import {RetroService} from '../../service/retro.service';
import {Template} from '../../app.interface';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    public cardTemplates: Array<Template>;
    public selectedCard: Template;

    constructor(private retroService: RetroService) {
    }

    ngOnInit() {
        this.retroService.getBoardTemplates().subscribe((templates) => {
            // console.log('templates  ', templates);
            this.cardTemplates = templates['body'];
            this.addCustomTemplate();
        });

    }

    public templateSelectionChange(template): void {
        this.selectedCard = template;
    }

    private addCustomTemplate(): void {
        const template: Template = {} as Template;
        template.code = 'custom';
        template.name = 'Create your own board';
        template.description = 'Customize the column count and titles to make your very own retrospective board.';
        template.imageName = 'services.svg';
        template.cardCategories = [];
        this.cardTemplates.push(template);
    }
}
