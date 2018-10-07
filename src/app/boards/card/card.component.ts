import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CardInfo} from '../../app.interface';
import {RetroService} from '../../service/retro.service';

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
    @Output() addOrUpdateVote = new EventEmitter();
    @Input() savedMemberCards: Array<CardInfo> = [];
    public cardFormGroup: FormGroup;
    public savedMemberGroup: FormGroup;
    private likedArr = [];

    constructor(private fb: FormBuilder, private retroService: RetroService) {
    }

    ngOnInit() {
        this.cardFormGroup = this.fb.group({
            cardMessage: ['', [Validators.required, Validators.minLength(2)]]
        });

        this.savedMemberGroup = this.fb.group({});
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

    public clickOnThumb(card: CardInfo, action: string): void {
        const upIndex = this.likedArr.indexOf('up');
        const downIndex = this.likedArr.indexOf('down');
        if (action === 'up') {
            card.isLiked = true;
            if (upIndex >= 0) {
                card.cardInfo = downIndex >= 0 ? card.cardInfo : null;
                this.likedArr.splice(upIndex);
            } else {
                this.likedArr.push('up');
                card.cardInfo = 'abc';
            }
        } else {
            card.isLiked = false;
            if (downIndex >= 0) {
                card.cardInfo = upIndex >= 0 ? card.cardInfo : null;
                this.likedArr.splice(downIndex);
            } else {
                this.likedArr.push('down');
                card.cardInfo = 'abc';
            }
        }

        this.addOrUpdateVote.emit(card);
    }
}
