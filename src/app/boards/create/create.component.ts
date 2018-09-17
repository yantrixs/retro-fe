import {Component, OnInit} from '@angular/core';
import {RetroService} from '../../service/retro.service';
import {Template, UserBoard} from '../../app.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    public cardTemplates: Array<Template>;
    public selectedCard: Template;
    public boardForm: FormGroup;
    public isSubmitted = false;

    constructor(private retroService: RetroService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.boardForm = this.fb.group({
            boardName: ['', [Validators.required, Validators.min(5)]]
        });
        this.retroService.getBoardTemplates().subscribe((templates) => {
            // console.log('templates  ', templates);
            this.cardTemplates = templates['body'];
            this.addCustomTemplate();
        });

    }

    public templateSelectionChange(template: Template): void {
        if (template.code && template.code === 'custom') {
            this.selectedCard = template;
            if (template.categories.length > 0) {

            }
        } else {
            this.selectedCard = template;
        }
    }

    private addCustomTemplate(): void {
        const template: Template = {} as Template;
        template.code = 'custom';
        template.name = 'Create your own board';
        template.description = 'Customize the column count and titles to make your very own retrospective board.';
        template.imageName = 'services.svg';
        template.categories = [];
        this.cardTemplates.push(template);
    }

    public createNewBoard(): void {
        this.isSubmitted = true;
        if (this.boardForm.valid && this.selectedCard) {
            const newBoardInfo: UserBoard = {} as UserBoard;
            newBoardInfo.title = this.boardForm.value;
            newBoardInfo.categories = this.selectedCard.categories;
            console.log(' newBoardInfo ', newBoardInfo);
            this.retroService.saveUserBoard(newBoardInfo).subscribe((resp) => {

            });
        }
    }

    public cancelBoard(): void {
        this.isSubmitted = false;
    }
}
