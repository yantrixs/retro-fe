import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RetroService} from '../../service/retro.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Util} from '../../util/app.util';
import {BoardMember} from '../../app.interface';

@Component({
    selector: 'app-manage-member',
    templateUrl: './manage-member.component.html',
    styleUrls: ['./manage-member.component.css']
})
export class ManageMemberComponent implements OnInit, OnDestroy {
    public boardTitle = '';
    public boardName = '';
    public showDropDownItems = false;
    public showAddMember = false;
    public inviteMemberGroup: FormGroup;
    public isSubmitted = false;
    public owner;
    public showEditPermission = false;
    public emailList: Array<string> = [];
    public tableOptions = [
        {label: 'Add Members', isDivider: true},
        {label: 'Board'},
        {label: 'Board Catalog'},
        {label: 'Dashboard', isDivider: true},
        {label: 'Help'}];
    private boardSubscription$: Subscription;

    constructor(private activatedRouter: ActivatedRoute,
                private retroService: RetroService,
                private fb: FormBuilder,
                private router: Router) {
    }

    ngOnInit() {
        this.inviteMemberGroup = this.fb.group({
            memberEmail: ['', [Validators.required]]
        });
        this.boardName = this.activatedRouter.snapshot.paramMap.get('name');

        this.boardSubscription$ = this.retroService.getBoardDetails(this.boardName).subscribe((res) => {
            this.boardTitle = res.title;
            this.owner = res.owner;
            console.log('this.userBoardInfo    ', res);
        }, (err) => {
            console.log('Error info   ', err);
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

    public addMember(): void {
        this.showAddMember = true;
    }

    public inviteCancel(): void {
        this.showAddMember = false;
        this.isSubmitted = false;
    }

    public inviteMember(): void {
        this.isSubmitted = true;
        if (this.inviteMemberGroup.get('memberEmail').value === '' && this.emailList.length > 0) {
            // call to service
            const member = {} as BoardMember;
            member.emailAddress = this.emailList.toString();
            member.canContribute = true;
            this.boardSubscription$ = this.retroService.addNewMemberToBoard(member, this.boardName).subscribe((res) => {
               console.log('Manage Members Res  ', res);
            }, (err) => {
                console.log('Manage Members Res  ', err.message);
            });
            // console.log(this.emailList.toString());
        } else if (this.inviteMemberGroup.get('memberEmail').value !== '') {
            const emailValidation = Util.isValidEmails(this.inviteMemberGroup.get('memberEmail').value);
            if (!emailValidation.isValid) {
                this.inviteMemberGroup.get('memberEmail').setErrors({'incorrect': true});
            } else {
                this.inviteMemberGroup.get('memberEmail').setValue('');
                this.inviteMemberGroup.get('memberEmail').setErrors(null);
                for (const email of emailValidation.emailList) {
                    this.emailList.push(email);
                }
            }
        }

    }

    public routeHandler(lbl: string): void {
        switch (lbl) {
            case 'Add Members':
                this.showAddMember = true;
                break;
            case 'Board':
                this.router.navigate(['/boards/board', this.boardName]);
                break;
            case 'Board Catalog':
            case 'Dashboard': // need work on to move navigate to Dashboard screen
                this.router.navigate(['/boards']);
                break;
        }
    }
}
