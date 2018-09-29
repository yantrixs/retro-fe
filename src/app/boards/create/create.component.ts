import {Component, OnDestroy, OnInit} from '@angular/core';
import {RetroService} from '../../service/retro.service';
import {CardCategory, Template, UserBoard} from '../../app.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

    public cardTemplates: Array<Template>;
    public selectedCard: Template;
    public boardForm: FormGroup;
    public isSubmitted = false;
    public leftTemplate: Array<Template> = [];
    public rightTemplate: Array<Template> = [];
    private createSubscription$: Subscription;

    constructor(private retroService: RetroService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.boardForm = this.fb.group({
            boardName: ['', [Validators.required, Validators.min(5)]]
        });
        this.createSubscription$ = this.retroService.getBoardTemplates().subscribe((templates) => {
            // console.log('templates  ', templates);
            this.cardTemplates = templates['body'];
            this.leftTemplate = this.segregateLeftRightCards('even');
            this.rightTemplate = this.segregateLeftRightCards('odd');
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
        this.rightTemplate.push(template);
    }

    public createNewBoard(): void {
        this.isSubmitted = true;
        if (this.boardForm.valid && this.selectedCard) {
            const newBoardInfo: UserBoard = {} as UserBoard;
            newBoardInfo.title = this.boardForm.value;
            newBoardInfo.categories = this.selectedCard.categories;
            console.log(' newBoardInfo ', newBoardInfo);
            this.retroService.saveUserBoard(newBoardInfo).subscribe((resp) => {
                console.log('Response is ', resp);
            });
        }
    }

    public cancelBoard(): void {
        this.isSubmitted = false;
    }

    public ngOnDestroy(): void {
        this.createSubscription$.unsubscribe();
    }

    private segregateLeftRightCards(type: string): Array<Template> {
        const array: Array<Template> = [];
        this.cardTemplates.forEach((item, i) => {
            if (type === 'even' && i % 2 === 0) {
                array.push(item);
            } else if (type === 'odd' && i % 2 !== 0) {
                array.push(item);
            }
        });
        return array;
    }
}
