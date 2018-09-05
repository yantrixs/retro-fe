import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class SpinnerService {
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    display(value: boolean) {
        this.status.next(value);
    }

    public setLogged(val: boolean): void {
        //  console.log('value is :: ', val);
        this.subject.next(val);
    }

    public getLogged(): Observable<boolean> {
        return this.subject.asObservable();
    }
}
