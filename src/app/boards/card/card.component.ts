import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CardInfo} from '../../app.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input() categoryName: string;
    @Input() isCardAdded = false;
    @Output() removeCard = new EventEmitter();
    @Output() addNewCard = new EventEmitter();
    @Input() savedMemberCards: Array<CardInfo> = [];
    public cardFormGroup: FormGroup;
    public savedMemberGroup: FormGroup;
    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.cardFormGroup = this.fb.group({
            cardMessage: ['', [Validators.required, Validators.minLength(2)]]
        });

        this.savedMemberGroup = this.fb.group({

        });
    }

    public closeCard(): void {
        this.removeCard.emit(this.categoryName);
    }

    public addCard(): void {
        const cardInfo: CardInfo = {} as CardInfo;
        cardInfo.cardCategoryName = this.categoryName;
        cardInfo.message = this.cardFormGroup.value.cardMessage;
        this.addNewCard.emit(cardInfo);
    }
}
