import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SpinnerService} from './service/spinner.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
    title = 'retro-fe';
    public showLoader: boolean;
    private loaderSubscription$: Subscription;

    constructor(private ss: SpinnerService, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.loaderSubscription$ = this.ss.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }

    ngOnDestroy(): void {
        if (this.loaderSubscription$) {
            this.loaderSubscription$.unsubscribe();
        }
    }

    public ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }
}
