import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {RetroService} from '../../service/retro.service';
import {CardInfo} from '../../app.interface';
import {AuthService} from 'ng2-ui-auth';
import {MessageService} from 'primeng/api';
import {Util} from '../../util/app.util';
import {FormBuilder, FormGroup} from '@angular/forms';

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
    public memberCards: Array<CardInfo> = [];
    public isAddNewCard = false;
    public showDropDownItems = false;
    public isEnableNotification = false;
    public displayShareModal = false;
    public isURLCopied = false;
    public tableOptions = [{
        label: 'Edit'
    }, {label: 'Delete'}, {label: 'Archive'}];
    public shareFormGroup: FormGroup;
    private boardSubscription$: Subscription;

    private static getAbbreviation(username: string): string {
        const usernameArr: string[] = username.split(' ');
        if (usernameArr.length === 1) {
            return usernameArr[0].substring(0, 1).toLowerCase();
        } else {
            return usernameArr[0].substring(0, 1).toLowerCase() + usernameArr[1].substring(0, 1).toLowerCase();
        }
    }

    constructor(private route: ActivatedRoute,
                private retroService: RetroService,
                private authService: AuthService,
                private messageService: MessageService,
                private fb: FormBuilder) {
    }

    public ngOnInit(): void {
        this.shareFormGroup = this.fb.group({
            sharedUrl: ['']
        });
        const name = this.route.snapshot.paramMap.get('name');
        // console.log('Name   ', name, this.authService.getPayload());
        this.boardSubscription$ = this.retroService.getBoardDetails(name).subscribe((res) => {
            this.userBoardInfo = res;
            this.percentageValue = 100 / this.userBoardInfo.cardCategories.length - 1;
            // console.log('this.userBoardInfo    ', this.userBoardInfo, '    ', this.percentageValue);
        }, (err) => {
            console.log('Error info   ', err);
        }, () => {
            // get saved Cards
            this.boardSubscription$ = this.retroService.getUserBoardCards(name).subscribe((res) => {
                console.log('Get User Board Cards    ', res);
                this.memberCards = res;
                Util.showToastMessage('serviceSuccess', this.messageService);
            }, (err) => {
                Util.showToastMessage('serviceFail', this.messageService, err.message);
            });
        });
    }


    public addNewCard(category, index): void {
        this.cardInfo = {} as CardInfo;
        this.isAddNewCard = true;
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
            if (item && item.cardCategoryName === card) {
                this.cardAssignList.splice(i, 1);
                this.cardAssignList.splice(i, 0, null);
                this.isAddNewCard = false;
            }
        });
    }

    public addCard(cardInfo: CardInfo): void {
        const payload = this.authService.getPayload();
        // const currentMember = this.userBoardInfo.boardMembers.find((member) => member.emailAddress === payload.email);
        cardInfo.boardName = this.userBoardInfo.name;
        cardInfo.boardTitle = this.userBoardInfo.title;
        cardInfo.memberName = payload.username;
        cardInfo.memberAbbreviation = BoardCatalogComponent.getAbbreviation(payload.username);
        cardInfo.memberEmail = payload.email;
        console.log('cardInfo   ', cardInfo);
        this.boardSubscription$ = this.retroService.saveMemberCard(cardInfo).subscribe((res) => {
            console.log('Res   ', res);
            this.memberCards.push(res);
            this.isAddNewCard = false;
            Util.showToastMessage('serviceSuccess', this.messageService);
        }, (err) => {
            Util.showToastMessage('serviceFail', this.messageService, err.message);
        });
    }

    public ngOnDestroy(): void {
        this.boardSubscription$.unsubscribe();
    }

    public showDropItems(): void {
        this.showDropDownItems = !this.showDropDownItems;
    }

    public refreshDropDownFlag(): void {
        this.showDropDownItems = !this.showDropDownItems;
    }

    public enableNotification(): void {
        this.isEnableNotification = !this.isEnableNotification;
    }

    public shareBoardLink(): void {
        this.boardSubscription$ = this.retroService.getSharedUrl(this.userBoardInfo.name).subscribe((res) => {
            const urlTxt = 'http://localhost:4200/boards/board/' + this.userBoardInfo.name + '?token=' + res['body'];
            this.shareFormGroup.get('sharedUrl').setValue(urlTxt);
            Util.showToastMessage('serviceSuccess', this.messageService);
        }, (err) => {
            Util.showToastMessage('serviceFail', this.messageService, err.message);
        }, () => {
            this.displayShareModal = true;
        });
    }

    public tokenCopy(): void {
        const url = this.shareFormGroup.get('sharedUrl').value;
        const copyElement = document.createElement('textarea');
        copyElement.style.position = 'fixed';
        copyElement.style.opacity = '0';
        copyElement.textContent = decodeURI(url);
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        body.removeChild(copyElement);
        this.isURLCopied = true;
    }
}
