import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {RetroService} from '../../service/retro.service';
import {CardInfo} from '../../app.interface';
import {AuthService} from 'ng2-ui-auth';

@Component({
    selector: 'app-board-catalog',
    templateUrl: './board-catalog.component.html',
    styleUrls: ['./board-catalog.component.css']
})
export class BoardCatalogComponent implements OnInit, OnDestroy {
    public userBoardInfo;
    public percentageValue = 100;
    public cardAssignList = [];
    public cardInfo: CardInfo;
    private boardSubscription$: Subscription;

    constructor(private route: ActivatedRoute, private retroService: RetroService, private authService: AuthService) {
    }

    public ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name');
        // console.log('Name   ', name);
        this.boardSubscription$ = this.retroService.getBoardDetails(name).subscribe((res) => {
            this.userBoardInfo = res;
            this.percentageValue = 100 / this.userBoardInfo.cardCategories.length - 1;
            // console.log('this.userBoardInfo    ', this.userBoardInfo, '    ', this.percentageValue);
        }, (err) => {
            console.log('Error info   ', err);
        });
    }


    public addNewCard(category, index): void {
        this.cardInfo = {} as CardInfo;
        const obj = this.cardAssignList.find((ele) => {
            if (!ele) {
                return null;
            }
            return ele.name === category.name;
        });
        if (!obj) {
            this.userBoardInfo.cardCategories.forEach((item, i) => {
                if (i === index) {
                    this.cardInfo.id = index;
                    this.cardInfo.cardCategoryName = category.name;
                    if (!this.cardAssignList[i]) {
                        this.cardAssignList.splice(i, 1);
                        this.cardAssignList.splice(i, 0, this.cardInfo);
                    } else {
                        this.cardAssignList.push(this.cardInfo);
                    }
                } else {
                    if (!this.cardAssignList[i]) {
                        this.cardAssignList.push(null);
                    }
                }
            });
        }
    }

    public closeCard(card: string): void {
        this.cardAssignList.forEach((item, i) => {
            if (item && item.name === card) {
                this.cardAssignList.splice(i, 1);
                this.cardAssignList.splice(i, 0, null);
            }
        });
    }

    public addCard(cardInfo: CardInfo): void {
        const payload = this.authService.getPayload();
        // const currentMember = this.userBoardInfo.boardMembers.find((member) => member.emailAddress === payload.email);
        cardInfo.boarName = this.userBoardInfo.name;
        cardInfo.boardTitle = this.userBoardInfo.title;
        cardInfo.memberEmail = payload.email;
        console.log('cardInfo   ', cardInfo);
    }

    public ngOnDestroy(): void {
        this.boardSubscription$.unsubscribe();
    }
}
